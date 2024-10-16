import { Injectable } from "@nestjs/common";
import { WareHouseInterface } from "../interfaces/warehouse.interface";
import { Model } from "mongoose";
import { WareHouseModel } from "../model/warehouse.model";
import { InjectModel } from "@nestjs/mongoose";
import { wareHouseSchemaName } from "../schema/warehouse.schema";


@Injectable()
export class WareHouseService {
    constructor(
        @InjectModel(wareHouseSchemaName)
        private readonly warehouseModel: Model<WareHouseModel>,

    ) {
    }
    

    public async setStoke(warehouse: WareHouseInterface): Promise<WareHouseModel> {
        const { sku } = warehouse;
        console.log('New product added: SKU:', sku)
        await this.warehouseModel.create(warehouse)
            return this.warehouseModel.findOneAndUpdate({ sku: warehouse.sku }, { $set: warehouse }, { upsert: false })
         
    }
    public async getProduct(sku:string){
        return this.warehouseModel.findOne({sku})

    }


}