import { Injectable } from "@nestjs/common";
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
}