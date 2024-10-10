import { Module } from "@nestjs/common";
import { WareHouseService } from "./services/warehouse.service";
import { WareHouseController } from "./controllers/warehouse.controller";

import { MongooseModule } from "@nestjs/mongoose";
import { wareHouseSchema, wareHouseSchemaName } from "./schema/warehouse.schema";

@Module({
    imports:[ MongooseModule.forFeature([{
        schema:wareHouseSchema,
        name:wareHouseSchemaName
    }])],
    providers:[WareHouseService],
    controllers:[WareHouseController]
})
export class WarehouseModule{

}