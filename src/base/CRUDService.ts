import { BaseService } from "./baseService";
import {Model, Types} from "mongoose";

export type QueryInput = {
    limit?: number;
    page?: number;
    order?: any;
    filter?: any;
    search?: string;
}

export class CRUDService<T> extends BaseService{
    constructor (public Model: Model<T>) {
        super();
    }
    
    async findbyID(id: string) {
        if(!Types.ObjectId.isValid(id)){
            Error("Invalid ID");
        } 
        const doc = this.Model.findById(id);
        if(!doc){
            throw Error("Data not found");
        }        
    }

    async create(data: any){
        return await this.Model.create(data);
    }

    async update(id: string, data: any){
        const doc = await this.Model.findByIdAndUpdate(id, {$set: data}, {new: true});
        if(!doc) {
            throw Error("Data not found");
        }
        return doc;
    }

    async delete(id: string){
        const doc = await this.Model.findByIdAndDelete(id);
        if(!doc){
            throw Error("Data not found");
        }
        return this.Model.findByIdAndDelete(id);
    }

    async fetch(queryInput: QueryInput, select?: string) {
        const limit = queryInput.limit || 10;
        const skip = ((queryInput.page || 1) - 1) * limit || 0;
        const order = queryInput.order;
        const query = this.Model.find();
        if (order) {
        query.sort(order);
        }
        if (queryInput.filter) {
            const filter = JSON.parse(
                JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
            );
            query.setQuery({ ...filter });
        }
        const countQuery = this.Model.find().merge(query);
        query.limit(limit);
        query.skip(skip);
        // console.time("Fetch");
        // console.time("Count");
        if (select) {
            query.select(select);
        }
        return await Promise.all([
            query.exec().then((res) => {
                // console.timeEnd("Fetch");
                return res;
            }),
            countQuery.count().then((res) => {
                // console.timeEnd("Count");
                return res;
            }),
            ]).then((res) => {
                return {
                    data: res[0],
                    pagination: {
                    page: queryInput.page || 1,
                    limit: limit,
                    total: res[1],
                    },
                };
            });
    }
} 