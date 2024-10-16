import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { WareHouseService } from "../services/warehouse.service";
import { WareHouseModel } from "../model/warehouse.model";
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { WareHouseInterface } from "../interfaces/warehouse.interface";

@Controller('warehouse')
export class WareHouseController {
    constructor(private readonly warehouseService: WareHouseService) {
    }
    @MessagePattern({ event: 'product-get' })
    public async getProduct(@Payload() product: WareHouseInterface) {
        console.log("d", product)
        const sku = product.sku
        const getProduct = await this.warehouseService.getProduct(sku)
        console.log(getProduct.qt)
        if (getProduct.qt > 1) {
            console.log("mojod")
        } else {
            console.log("na mojod")
        }

        return getProduct


    }

    @Put('')
    public async setStoke(@Body() warehouse: WareHouseModel): Promise<void> {
        await this.warehouseService.setStoke(warehouse)
    }

}