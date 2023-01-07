import { Controller, Get } from "@nestjs/common";

/*
* we declare controller with @ then controller and call that like a function

* @Controller() -> this is refered to as a decorator. this decorator is telling
* nest that we are going to create a class that is going to serve as a
* controller inside our application.
*
 */
@Controller("/app")
export class AppController {
  @Get("/home")
  getRootRoute() {
    return "hi there!";
  }

  @Get("/sunday")
  getSunday() {
    return "Beach!";
  }
}