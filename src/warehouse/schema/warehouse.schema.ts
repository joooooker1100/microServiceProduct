
import { Schema } from 'mongoose';
import {v4 as uuid} from 'uuid'

export const wareHouseSchemaName: string ='warehouse';
export const wareHouseSchema = new Schema({
    _id:{type : String , default:uuid},
    sku:String,
    qt:Number,
    expire: Date,
    location: String
})