import { Module } from "@nestjs/common";
import { RabitService } from "./rabit.service";

@Module({
    providers: [RabitService],
    exports: [RabitService]
})
export class RabbitModule {

}