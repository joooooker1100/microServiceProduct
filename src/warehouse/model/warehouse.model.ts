import { Document } from "mongoose";
import { WareHouseInterface } from "../interfaces/warehouse.interface";

export interface WareHouseModel extends WareHouseInterface , Document{}