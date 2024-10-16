import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

import { MongooseModule } from "@nestjs/mongoose";
import { productSchema, productSchemaName } from "./schema/product.schema";
import { RabbitModule } from "../rabbit/rabbit.servise.ts/rabbit.module";
import { WarehouseModule } from "../warehouse/warehouse.module";


@Module({
    imports: [RabbitModule,WarehouseModule,
        MongooseModule.forFeature([{
            schema: productSchema,
            name: productSchemaName
        }
    ])],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {

}