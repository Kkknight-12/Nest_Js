import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

/*
 * we will be passing an object and we are going to give single property ->
 *  controller property.
 * we will be listing out all the controller's that exist inside our
 *  application ( right now we only have one controller -> AppController ).
 *  */
@Module({
  controllers: [AppController],
})
export class AppModule {}