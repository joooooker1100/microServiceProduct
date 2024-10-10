import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { WareHouseService } from "../services/warehouse.service";
import { WareHouseModel } from "../model/warehouse.model";

@Controller('warehouse')
export class WareHouseController{
    constructor(private readonly warehouseService:WareHouseService){
    }
  
    @Put('')
    public async setStoke(@Body() warehouse:WareHouseModel):Promise<void>{
        await this.warehouseService.setStoke(warehouse)
    }
   
}