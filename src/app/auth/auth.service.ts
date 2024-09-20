import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environment';
import { User } from '../users/users.model';
import { UserInterface } from '../users/users.interface';
import { UsersService } from '../users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtPayload } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('user')!),
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  generateAccessToken(payload: JwtPayload): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    const signature = btoa(environment.secretCode);

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  decodedAccessToken(token: string): JwtPayload {
    const parts = token.split('.');
    return JSON.parse(atob(parts[1]));
  }

  register(user: UserInterface): boolean {
    const newUser = this.usersService.createUser(user);

    if (!newUser) {
      return false;
    }

    this.router.navigate(['/auth/login'], { relativeTo: this.route });
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.usersService.findUserByEmailAndPassword(email, password);

    if (user) {
      user.token = this.generateAccessToken({ userId: user.id, email });
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      this.router.navigate(['/']);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
