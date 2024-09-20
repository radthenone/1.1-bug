import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const userStorage = JSON.parse(localStorage.getItem('user') || '{}');

    console.log('User from local storage:', userStorage);
    console.log('User from service:', user);

    const isLoggedIn = !!userStorage?.id && user?.id === userStorage?.id;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    } else {
      console.warn('User is not logged in or API URL is incorrect.');
    }

    return next.handle(request);
  }
}
