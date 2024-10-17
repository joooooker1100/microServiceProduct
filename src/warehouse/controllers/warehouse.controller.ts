import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { WareHouseService } from "../services/warehouse.service";
import { WareHouseModel } from "../model/warehouse.model";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { WareHouseInterface } from "../interfaces/warehouse.interface";
import { RabitService } from "../../rabbit/rabbit.servise.ts/rabit.service";
import { HttpService } from "@nestjs/axios";

@Controller('warehouse')
export class WareHouseController {
    constructor(private readonly warehouseService: WareHouseService,
        private readonly rabbitService: RabitService,
        private readonly httpService: HttpService
    ) {
    }
   // @MessagePattern({ event: 'product-get' })
 //   public async getProduct(@Payload() product: WareHouseInterface) {
   //     console.log("d", product)
   //     const sku = product.sku
    //    const getProduct = await this.warehouseService.getProduct(sku)
    //    console.log(getProduct)
    //    await this.rabbitService.sendMessage('product-status', getProduct)
    //    return getProduct


 //   }
    @Get(':sku')
    public async getProduct(@Param('sku') sku: string) {
      const product = await this.warehouseService.getProduct(sku);
      const status = product
      console.log(status);
      await this.rabbitService.sendMessage('product-status', status)
     // await this.httpService.post(`http://localhost:3001/api/shop/${status}`)
      
     
      return { ...product,status };
    }
    

    @Put('')
    public async setStoke(@Body() warehouse: WareHouseModel): Promise<void> {
        await this.warehouseService.setStoke(warehouse)
    }

}