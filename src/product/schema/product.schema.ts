
import { Schema } from 'mongoose';
import {v4 as uuid} from 'uuid'

export const productSchemaName: string ='Product';
export const productSchema = new Schema({
    _id:{type : String , default:uuid},
    title: String,
    sku: String,
    category: String
})