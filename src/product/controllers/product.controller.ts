import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { ProductInterface } from "../interfaces/product.interface";
import { ProductModel } from "../model/product.model";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService,
    ) { }
    @Post()
    public async create(@Body() product: ProductInterface): Promise<ProductModel> {
        return this.productService.create(product)
    }
    @Put(':id')
    public async editProduct(@Body() id: string, product: ProductModel): Promise<void> {
        await this.productService.editProduct(id, product)
    }
    @Get(':id')
    public async getProduct(id: string) {
        return this.productService.getProduct(id)
    }
    @Get('')
    public async getProducts(): Promise<ProductModel[]> {
        return this.productService.getProducts()
    }
    @Delete(':id')
    public async deleteProduct(@Param('id') id: string): Promise<void> {
        await this.productService.deleteProduct(id)
    }



}