import { Module } from "@nestjs/common";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

import { MongooseModule } from "@nestjs/mongoose";
import { productSchema, productSchemaName } from "./schema/product.schema";

@Module({
    imports:[ MongooseModule.forFeature([{
        schema:productSchema,
        name:productSchemaName
    }])],
    providers:[ProductService],
    controllers:[ProductController]
})
export class ProductModule{

}