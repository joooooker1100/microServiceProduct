import { Module } from "@nestjs/common";
import { WareHouseService } from "./services/warehouse.service";
import { WareHouseController } from "./controllers/warehouse.controller";

import { MongooseModule } from "@nestjs/mongoose";
import { wareHouseSchema, wareHouseSchemaName } from "./schema/warehouse.schema";
import { RabbitModule } from "src/rabbit/rabbit.servise.ts/rabbit.module";

@Module({
    imports: [RabbitModule,
         MongooseModule.forFeature([{
        schema: wareHouseSchema,
        name: wareHouseSchemaName
    }])],
    providers: [WareHouseService],
    controllers: [WareHouseController]
})
export class WarehouseModule {

}