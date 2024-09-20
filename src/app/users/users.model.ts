import { UserInterface } from './users.interface';

export class User implements UserInterface {
  id?: number;
  email?: string;
  password?: string;
  token?: string;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.token = user.token;
  }
}
