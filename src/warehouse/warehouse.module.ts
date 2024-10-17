import { Module } from "@nestjs/common";
import { WareHouseService } from "./services/warehouse.service";
import { WareHouseController } from "./controllers/warehouse.controller";

import { MongooseModule } from "@nestjs/mongoose";
import { wareHouseSchema, wareHouseSchemaName } from "./schema/warehouse.schema";
import { RabbitModule } from "../rabbit/rabbit.servise.ts/rabbit.module";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [RabbitModule,HttpModule,
         MongooseModule.forFeature([{
        schema: wareHouseSchema,
        name: wareHouseSchemaName
    }])],
    providers: [WareHouseService],
    controllers: [WareHouseController],
    exports: [WareHouseService]
})
export class WarehouseModule {

}