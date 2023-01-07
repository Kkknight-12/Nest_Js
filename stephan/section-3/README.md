# 3

let’c create a new project with nest CLI

### Install nest CLI

lets install nest CLI

```tsx
npm install -g @nestjs/cli
```

### generate a new project

```tsx
nest new <name of project>
```

```tsx
nest new messages
```

![Screenshot 2023-01-07 at 7.57.06 PM.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_2023-01-07_at_7.57.06_PM.png)

we need controller service and repository

![Screenshot from 2023-01-07 19-58-46.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_19-58-46.png)

![Screenshot from 2023-01-07 20-02-41.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_20-02-41.png)

![Screenshot from 2023-01-07 20-01-12.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_20-01-12.png)

![Screenshot from 2023-01-07 20-03-58.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_20-03-58.png)

lets run the project with `start:dev`

```tsx
"start:dev": "nest start --watch",
```

this will start the project in the development mode. 

lets delete all the files we have got in src except main and create a module with help of nest cli

![Screenshot 2023-01-07 at 8.10.25 PM.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_2023-01-07_at_8.10.25_PM.png)

```tsx
$ nest generate module messages
```

we will be creating a messages module but while writing the command to create it we skip the word module as nest js attach that as suffix

![Screenshot 2023-01-07 at 8.12.20 PM.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_2023-01-07_at_8.12.20_PM.png)

![Screenshot 2023-01-07 at 8.14.53 PM.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_2023-01-07_at_8.14.53_PM.png)

lets edit main.ts import

```tsx
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from "./messages/messages.module";

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  await app.listen(3000);
}
bootstrap();
```

### More in generating Files

let’s create a controller

```tsx
nest generate controller messages/messages --flat
```

![Screenshot 2023-01-07 at 9.22.03 PM.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_2023-01-07_at_9.22.03_PM.png)

 the controller must also be added to the module

but nest js do that for us.

```tsx
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController]
})
export class MessagesModule {}
```

generate feature not only create file for us but also update file for us.

![Screenshot from 2023-01-07 21-27-15.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_21-27-15.png)

### Adding Routing Logic

![Screenshot from 2023-01-07 21-30-34.png](3%2099153f70e82e4de3833ea572e57cbcc0/Screenshot_from_2023-01-07_21-30-34.png)

```tsx
import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages(){

  }

  @Post()
  createMessages(){

  }

  @Get('/:id')
  getMessage(){

  }
}
```