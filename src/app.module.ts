import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { environment } from "./environment/environment";
import { ProductModule } from "./product/product.module";
import { WarehouseModule } from "./warehouse/warehouse.module";


@Module({
    imports: [ProductModule
        , WarehouseModule,
        MongooseModule.forRoot(environment.mongoDBUrl)]
})
export class AppModule {

}
