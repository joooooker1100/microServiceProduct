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
    public async create(product :ProductInterface):Promise<ProductModel>{
        return this.productModel.create(product)
    }
    public async getProduct(id:string):Promise<ProductModel>{
        return this.productModel.findOne({_id:id})
    }
    public async getProducts():Promise<ProductModel[]>{
        return this.productModel.find()
    }
   public async deleteProduct(id:string):Promise<void>{
        await this.productModel.deleteOne({_id:id})
   }
   public async editProduct(id:string,product:ProductModel):Promise<void>{
        await this.productModel.updateOne({_id:id},{$set:product})
}
    
}