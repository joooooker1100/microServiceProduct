import { Injectable } from "@nestjs/common";
import { WareHouseInterface } from "../interfaces/warehouse.interface";
import { Model } from "mongoose";
import { WareHouseModel } from "../model/warehouse.model";
import { InjectModel } from "@nestjs/mongoose";
import { wareHouseSchemaName } from "../schema/warehouse.schema";

@Injectable()
export class WareHouseService{
    constructor(
        @InjectModel(wareHouseSchemaName)
        private readonly warehouseModel: Model<WareHouseModel>
    ){
    }
    public async setStoke(warehouse :WareHouseInterface):Promise<WareHouseModel>{
        return this.warehouseModel.findOneAndUpdate({sku:warehouse.sku},{$set:warehouse},{upsert:true})
    }

    
}