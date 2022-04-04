import _ from "lodash";
import logger from "../../helpers/logger";
import redis from "../../helpers/redis";
import { AddressModel } from "./address.model";

export default {
    Query: {
        getAllProvinces: async (root: any, args: any, context: any) => {
            redis.incr("address:count");
            return await getProvinceRedis();
        },
        getAllDistricts: async (root: any, args: any, context: any) => {
            const districts = await AddressModel.aggregate([{
                $match: 
                {
                    wardID: null, 
                    wardName: null
                } 
            }
        ])
            return _.reduce(districts, function (res: any, val: any) {
                if(val.districtID && val.districtName){
                    res.push({
                        id: val.districtID,
                        name: val.districtName
                    })
                }
                return res;
            }, [])
        },
        getAllWards: async (root: any, args: any, context: any) => {
            const wards = await AddressModel.find({
                wardID: {$ne: null},
                wardName: {$ne: null}
            })
            return _.reduce(wards, function (res: any, val: any) {
                res.push({
                    id: val.wardID,
                    name:val.wardName
                })
                return res;
            }, [])
        },
        getOneProvince: async(root: any, args: any, context: any) => {
            const {id} = args;
            console.log("id", id);
            const provinces = await AddressModel.aggregate([{
                $match: {
                    districtID: null, 
                    districtName: null, 
                    wardID: null, 
                    wardName: null
                }}
            ]);
            return _.reduce(provinces, function(res: any, val: any){
                if(id == val.provinceID){
                    res["id"] = val.provinceID;
                    res["name"] = val.provinceName;
                }
                return res;
            }, {})
        },
        getOneDistrict: async(root: any, args: any, context: any) => {
            const {id} = args;
            const districts = await AddressModel.aggregate([
                {
                    $match: {
                        wardID: null, 
                        wardName: null
                    }
                }
            ]);
            return _.reduce(districts, function(res: any, val: any){
                if(id == val.districtID){
                    res["id"] = val.districtID;
                    res["name"] = val.districtName; 
                }
                return res;
            }, {})
        },
        getOneWard: async (root: any, args: any, context: any) => {
            const {id} = args;
            const wards = await AddressModel.find({
                wardID: {$ne: null},
                wardName: {$ne: null}
            })
            return _.reduce(wards, function (res: any, val: any) {
                if(id == val.wardID){
                    res["id"] = val.wardID;
                    res["name"] = val.wardName; 
           1    }
                return res;
            }, {})
        }
    },
    Province: {
        view: async (root: any, args: any, context: any) => {
            return redis.get("address:count") || 0;
        }
    }
}

async function getProvinceRedis() {
    const key = "address:province";
    const result = await redis.get(key);
    console.log(result);
    if(_.isEmpty(result) == false){
        logger.info("Get data from Redis");
        return JSON.parse(result as string);
    }
    else{
        const provinces = await AddressModel.aggregate([{
            $match: {
                districtID: null,
                districtName: null,
                wardID: null,
                wardName: null
            }
        }
        ]);
        const data = _.reduce(provinces, function (res: any, val: any) {
            res.push({
                id: val.provinceID,
                name: val.provinceName
            }
            );
            return res;
        }, []); 
        logger.info("Set data to Redis");
        await redis.set(key, JSON.stringify(data), {EX: 10});
        return data;
    }
}
