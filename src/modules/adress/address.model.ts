import {Schema} from "mongoose"
import { Mongo } from "../../helpers/mongo"

const addressSchema = new Schema({
    provinceID: {type: String, required: true},
    provinceName: {type: String, required: true},
    districtID: {type: String},
    districtName: {type: String},
    wardID: {type: String},
    wardName: {type: String},
})

addressSchema.index({provinceID: 1, districtID: 1, wardID: 1})
export const AddressModel = Mongo.model("Address", addressSchema)
