# 2

As we can see nest library itself is spread out in several different packages.

![Screenshot from 2023-01-07 12-13-35.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_12-13-35.png)

Nest js does not handle incoming request instead nest depend on some outside implementation to handle request for it.

So inside of our nest server, we are going to have some place inside of our code where we have to plug in some kind of http implementation. We have to provide some kind of server that says here is something that’s going to handle incoming requests.

We have two options for HTTP server implementation,

- Express
- Fastify

![Screenshot from 2023-01-07 12-20-18.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_12-20-18.png)

Right now the default is to make use of express. But we can easily use fastify instead. 

### Setting up Ts file and Ts compiler

create a tsconfig.json file at root folder

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```

### Create controller

![Screenshot from 2023-01-07 12-34-11.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_12-34-11.png)

![Screenshot from 2023-01-07 12-35-29.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_12-35-29.png)

other nest tools

![Screenshot from 2023-01-07 12-36-38.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_12-36-38.png)

lest create main.ts in the src folder which is going the to be the first file that gets executed in nay nest project, so we will usually have some inside here to start up the application and start listening to the traffic on the particular port.  

![Screenshot 2023-01-07 at 12.39.59 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_12.39.59_PM.png)

Usually we create a module and a controller in a separate file but right now we are going to create a module and controller directly inside the `main.ts` file. 

```json
import { Controller, Module, Get } from "@nestjs/common";

/*
* we declare controller with @ then controller and call that like a function

* @Controller() -> this is refered to as a decorator. this decorator is telling
* nest that we are going to create a class that is going to serve as a
* controller inside of our application.
*
 */
@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}
```

### Starting up Nest app, creating a module

let’s create a modul. 

A module is going to wrap up controller. 

when we use a module decorator, we expect to pass a configuration option or object to it.

```tsx
/*
 * we will be passing an object and we are going to give single property ->
 *  controller property.
 * we will be listing out all the controller's that exist inside our
 *  application ( right now we only have one controller -> AppController ).
 *  */
@Module({
  controllers: [AppController],
})
class AppModule {}
```

So when ever our application starts **nest** is going to look at this app module, it’s going to find all the controller listed and it’s going to automatically create an instance of all of our different controller classes. So nest will create an instance of our app controller. 

now we will add in a function that is going to run anytime we start up the application. That function will we async function( default name is → bootstrap ), which you can name anything. 

Inside of which we are going to create a new nest application out of our module.

here we are passing the AppModule to the create function that is going to create an instance of our nest application. And once we create out app. we are going to use this variable to listen to our incoming traffic. 

```tsx
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
}
```

Full code

```tsx
import { Controller, Module, Get } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

/*
* we declare controller with @ then controller and call that like a function

* @Controller() -> this is refered to as a decorator. this decorator is telling
* nest that we are going to create a class that is going to serve as a
* controller inside of our application.
*
 */
@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}

/*
 * we will be passing an object and we are going to give single property ->
 *  controller property.
 * we will be listing out all the controller's that exist inside our
 *  application ( right now we only have one controller -> AppController ).
 *  */
@Module({
  controllers: [AppController],
})
class AppModule {}

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
```

```tsx
npx ts-node-dev src/main.ts
```

![Screenshot 2023-01-07 at 1.29.10 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_1.29.10_PM.png)

### Naming Conventions

![Screenshot from 2023-01-07 14-31-55.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_from_2023-01-07_14-31-55.png)

![Screenshot 2023-01-07 at 2.36.18 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_2.36.18_PM.png)

```tsx
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
```

```tsx
import { Controller, Get } from "@nestjs/common";

/*
* we declare controller with @ then controller and call that like a function

* @Controller() -> this is refered to as a decorator. this decorator is telling
* nest that we are going to create a class that is going to serve as a
* controller inside our application.
*
 */
@Controller()
export class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}
```

```tsx
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
```

### Routing Decorator

```tsx
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

  @Get("/home")
  getRootRoute() {
    return "hi there!";
  }
}
```

![Screenshot 2023-01-07 at 2.38.52 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_2.38.52_PM.png)

we can also add prefix to the path inside our controller decorator

```tsx
@Controller("/app")
export class AppController {
  @Get("/home")
  getRootRoute() {
    return "hi there!";
  }
}
```

![Screenshot 2023-01-07 at 2.39.59 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_2.39.59_PM.png)

![Screenshot 2023-01-07 at 2.40.21 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_2.40.21_PM.png)

```tsx
@Controller("/app")
export class AppController {

  @Get("/sunday")
  getSunday() {
    return "Beach!";
  }
}
```

![Screenshot 2023-01-07 at 2.42.49 PM.png](2%209f17ace0f7424ada870e5ce8bd849da1/Screenshot_2023-01-07_at_2.42.49_PM.png)