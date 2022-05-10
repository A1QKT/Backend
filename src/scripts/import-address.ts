import addressJSON from "../assets/address.json"
import { AddressModel } from "../modules/adress/address.model"

async function run(){
    const addresses: any = [];
    addressJSON.forEach((province) => {
        addresses.push({
            provinceID: province.pid,
            provinceName: province.pn,
        });
        province.ds.forEach((district) => {
            addresses.push({
            provinceID: province.pid,
            provinceName: province.pn,
            districtID: district.did,
            districtName: district.dn,
        });
            district.ws.forEach((ward) => {
                addresses.push({
                    provinceID: province.pid,
                    provinceName: province.pn,
                    districtID: district.did,
                    districtName: district.dn,
                    wardID: ward.wid,
                    wardName: ward.wn
                });
            });
        });
    });
    console.log(addresses);
    await AddressModel.insertMany(addresses);
    console.log("Insert Successfully");
}

run()