import { Injectable } from "@nestjs/common";
import { ProductInterface } from "../interfaces/product.interface";
import { Model } from "mongoose";
import { ProductModel } from "../model/product.model";
import { InjectModel } from "@nestjs/mongoose";
import { productSchemaName } from "../schema/product.schema";
import { RabitService } from "../../rabbit/rabbit.servise.ts/rabit.service"
import { time } from "console";


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(productSchemaName)
        private readonly productModel: Model<ProductModel>,
        private readonly rabbiService: RabitService
    ) {
    }
    public async create(product: ProductInterface): Promise<ProductModel> {
        const material = await this.productModel.create(product);
        await this.rabbiService.sendMessage('product-created', material)
        return material;
    }

    public async getProduct(id: string): Promise<ProductModel> {
        return this.productModel.findOne({ _id: id })
    }
    public async getProducts(): Promise<ProductModel[]> {
        return this.productModel.find()
    }
    public async deleteProduct(id: string): Promise<void> {
        const product = await this.productModel.findOne({ _id: id })
        await product.deleteOne();
        this.rabbiService.sendMessage('product-deleted', { sku: product.sku })

    }
    public async editProduct(id: string, product: ProductInterface): Promise<void> {
        await this.productModel.updateOne({ _id: id }, { $set: product })
    }

}