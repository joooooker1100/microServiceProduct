import { Document } from "mongoose";
import { ProductInterface } from "../interfaces/product.interface";

export interface ProductModel extends ProductInterface ,Document{}