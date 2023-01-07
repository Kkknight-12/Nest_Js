import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

/*
* now we will add in a function that is going to run anytime we start up the application.
* That function will we async function( default name is → bootstrap ), which you can
* name anything.

* Inside of which we are going to create a new nest application out of our
*  module.

* here we are passing the AppModule to the create function that is going to
* create an instance of our nest application. And once we create out app. we are going
* to use this variable to listen to our incoming traffic. */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();