import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Jack Doe',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === +id);
  }

  create(user: { name: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const userId: Date = new Date();
    const newUser = { ...user, id: Number(userId) };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: string,
    userUpdate: { name?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' },
  ) {
    const userIndex = this.users.findIndex((user) => user.id === +id);

    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...userUpdate,
      };
      return this.users[userIndex];
    }
  }

  remove(id: string) {
    const removedUser = this.findOne(id);

    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== +id);
      return removedUser;
    }
  }
}