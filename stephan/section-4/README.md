# 4

# Validating Request Data with Pipes

### Accessing Request Data with Decorators

![Screenshot from 2023-01-08 09-30-19.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_from_2023-01-08_09-30-19.png)

![Screenshot from 2023-01-08 09-31-46.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_from_2023-01-08_09-31-46.png)

[Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/openapi/decorators#decorators)

- The **controller decorator** we have used before is a **class decorator** as we were applying it to all class.
- **Get** and **Post** were method decorator as they were applied to the entire method.
- body and params are arguments decorator as will be writing them in the argument list.

using **Body Decorator**

```tsx
@Post()
  createMessages(@Body() body: any) {
    console.log(body);
  }
```

nest is going to automatically extract the body of the incoming request and provide it as an argument to our route handler called body. 

we are going to receive an argument called id

```tsx
@Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log('id -> ', id);
  }
```

Full code

```tsx
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    console.log('heeyyaaaa');
  }

  @Post()
  createMessages(@Body() body: any) {
    console.log(body);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log('id -> ', id);
  }
}
```

POST

![Screenshot 2023-01-08 at 9.57.23 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_9.57.23_AM.png)

![Screenshot 2023-01-08 at 9.57.48 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_9.57.48_AM.png)

GET

![Screenshot 2023-01-08 at 9.59.28 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_9.59.28_AM.png)

![Screenshot 2023-01-08 at 9.59.33 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_9.59.33_AM.png)

### Using Pipe for validation

let’s use pipe to check the incoming request.

![Screenshot from 2023-01-08 10-18-02.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_from_2023-01-08_10-18-02.png)

Nest js provide us Validation pipe

```tsx
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe());
```

Full Code

```tsx
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
```

### Adding Validation Rules

![Screenshot from 2023-01-08 10-25-37.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_from_2023-01-08_10-25-37.png)

let’s create a class → data transfer object → dto and add come validation rules to it. 

 It will describe all the different properties that we expect our post request handler to receive. 

```tsx
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
}
```

We expect the body of request coming in to our request handler to have a content property that is going to be a string.

We will also be using a library called Class Validator to add couple of validation to the class itself. To applu this decorator to the string property in side our **CreateMesageDto** class. So our validator is going to make sure that whenever we create an instance of  **CreateMesageDto** we can make sure that content property actually is string**.**

Importing **CreateMesageDto** in Controller and applying it to body type.

```tsx
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { **CreateMessageDto** } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {

  @Post()
  createMessages(@Body() body: **CreateMessageDto**) {
    console.log(body);
  }
}
```

Testing Validation

- sending a request with message property
    
    ![Screenshot 2023-01-08 at 10.34.53 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_10.34.53_AM.png)
    
    we get a bad response as there is no property in validator named message
    

- sending content property with string value
    
    ![Screenshot 2023-01-08 at 10.35.23 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_10.35.23_AM.png)
    
    we get 201 response
    
    ![Screenshot 2023-01-08 at 10.35.30 AM.png](4%2008b75b7541414d12b990ab0726591553/Screenshot_2023-01-08_at_10.35.30_AM.png)
    

now we can send only a content property with string value.

### Summary