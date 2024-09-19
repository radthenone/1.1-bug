import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environment';
import { User } from '../users/users.model';
import { UserInterface } from '../users/users.interface';
import {UsersService} from "../users/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  register(user: UserInterface): boolean {
    const newUser = this.usersService.createUser(user);

    if (!newUser) {
      return false;
    }

    if (newUser) {
      this.router.navigate(['/auth/login'], { relativeTo: this.route });
    }

    return true;

  }

  login(email: string, password: string): boolean {
    const user = this.usersService.findUserByEmailAndPassword(email, password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}