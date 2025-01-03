import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
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
   public async getProduct(@Param('sku')sku: string, @Query('qt')qt:number ) {
     console.log("qqqqqq",qt)
     const tedad =qt;
    const product = await this.warehouseService.findBySku(sku);
    if(!product){
      throw new NotFoundException(`Product with sku ${sku} not found`)
   }
   await this.warehouseService.decrementQt(product.sku,tedad)
   return product
  }
  //    await this.rabbitService.sendMessage('product-status', status)
  //    console.log(status);
  //     return { ...product,status };
  //   }else{
  //     const status = {
  //       sku:product.sku,
  //       status:"na mojod"
  //     }
  //     await this.rabbitService.sendMessage('product-status', status)
  //     console.log(status);
  //     return { ...product,status };
  //   }
  // await this.httpService.post(`http://localhost:3001/api/shop/${status}`)



  //  }



  @Put('')
  public async setStoke(@Body() warehouse: WareHouseModel): Promise<void> {
    await this.warehouseService.setStoke(warehouse)
  }

}