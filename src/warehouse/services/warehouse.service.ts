import { Injectable, NotFoundException } from "@nestjs/common";
import { WareHouseInterface } from "../interfaces/warehouse.interface";
import { Model } from "mongoose";
import { WareHouseModel } from "../model/warehouse.model";
import { InjectModel } from "@nestjs/mongoose";
import { wareHouseSchemaName } from "../schema/warehouse.schema";
import { RabitService } from "../../rabbit/rabbit.servise.ts/rabit.service";


@Injectable()
export class WareHouseService {
    constructor(
        @InjectModel(wareHouseSchemaName)
        private readonly warehouseModel: Model<WareHouseModel>,
        private readonly rabbitService: RabitService
    ) {
    }
    public async setProductInShop(warehouse:WareHouseInterface):Promise<WareHouseModel>{
        return this.warehouseModel.create(warehouse)
    }


    public async setStoke(warehouse: WareHouseInterface): Promise<void> {
        const { sku } = warehouse;
        console.log('New product added: SKU:', sku, warehouse)
        await this.warehouseModel.updateOne({ sku: warehouse.sku }, { $set: warehouse }, { upsert: false })
        console.log(warehouse.location)
        if (warehouse.qt > 0) {
            const status = {
                sku: warehouse.sku,
                status: "mojod"
            }
            await this.rabbitService.sendMessage('product-status', status)
            console.log(status);

        } else {
            const status = {
                sku: warehouse.sku,
                status: "na mojod"
            }
            await this.rabbitService.sendMessage('product-status', status)
            console.log(status);

        }




    }
    public async getProduct(sku: string): Promise<WareHouseInterface> {
        return this.warehouseModel.findOne({ sku });
    }
    public async findBySku(sku: string): Promise<WareHouseInterface> {
        const product = await this.warehouseModel.findOne({ sku })
        if (!product) {
            throw new NotFoundException(`Product with sku ${sku} not found`)
        }
        return product
    }
    public async decrementQt(sku: string, qtDecrement: number): Promise<WareHouseInterface> {
        const product = await this.warehouseModel.findOne({ sku }).exec();
        if (!product) {
            throw new NotFoundException(`Product with SKU ${sku} not found`);
        }
        console.log('111',product.qt)
        console.log('222',qtDecrement)
        if (product.qt < qtDecrement) {
            throw new NotFoundException(`Not enough stock for SKU ${sku}`);
        }
        const finalQt = product.qt - qtDecrement;
        console.log(finalQt);
        await this.warehouseModel.updateOne(
            { sku: sku },
            { $set: { qt: finalQt } },
            { upsert: false }
        );
        product.qt = finalQt;
        console.log('333',product.qt)
        return product;
    }

}