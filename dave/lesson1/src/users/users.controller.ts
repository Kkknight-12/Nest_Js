import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // * GET / users
  // * GET /users/:id
  // * POST /users
  //* PATCH /users/:id
  //* DELETE /users/:id
  //*

  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return { role };
    }
    return this.usersService.findAll(role);
  }

  // Note: the order of the routes matters
  // the dynamic routes must be defined after all the
  // static routes otherwise the static routes will be
  // treated as dynamic routes
  @Get(':id') // GET /users/:id
  // the datatype of id is string
  // @Param() decorator is used to extract and bind route
  // parameters to a method parameter. It's typically used
  // in HTTP methods like GET, PATCH, DELETE where the
  // route contains an identifier to specify which resource
  // to fetch, update or delete.
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  // You can now use the `user` object which contains the
  // data from the request body @Body() is used in the
  // create and update methods to get the data from the
  // request body. The user and userUpdate parameters are
  // expected to be objects containing the data for the
  // user to be created or updated.
  create(
    @Body() user: { name: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    // You can now use the `id` to identify the user to
    // update and the `userUpdate` object which contains
    // the data from the request body

    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}