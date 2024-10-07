import { Injectable } from "@nestjs/common";
import { ProductInterface } from "../interfaces/product.interface";
import { Model } from "mongoose";
import { ProductModel } from "../model/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { productSchemaName } from "../schema/product.schema";

@Injectable()
export class ProductService{
    constructor(
        @InjectModel(productSchemaName)
        private readonly productModel: Model<ProductModel>
    ){

    }
    public async create(product :ProductInterface){
        return this.productModel.create(product)

    }
    
}