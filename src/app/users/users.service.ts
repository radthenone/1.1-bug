import { Injectable } from '@angular/core';
import { User } from './users.model';
import { UserInterface } from './users.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	private readonly users: User[] = [];

	constructor() {
		this.users = JSON.parse(localStorage.getItem('users') || '[]');
	}

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  isExistUser(email: string): boolean {
		return !!this.users.find(user => user.email === email);
  }

  findUserByEmailAndPassword(email: string, password: string): User | null {
		const user = this.users.find(user => user.email === email && user.password === password);
		return user || null;
  }

	private generateUniqueId(): number {
    const maxId = this.users.reduce((max, user) => (user.id! > max ? user.id! : max), 0);
    return maxId + 1;
  }

  createUser(user: UserInterface): User | null {
    if (this.isExistUser(user.email!)) {
      return null;
    }

    const newUserId = this.generateUniqueId();
    const newUser = new User({ ...user, id: newUserId });

    this.users.push(newUser);
    this.saveUsers();

    return newUser;
  }

  getUserById(userId: number): User | null {
		const user = this.users.find(user => user.id === userId);
		return user || null;
  }
}