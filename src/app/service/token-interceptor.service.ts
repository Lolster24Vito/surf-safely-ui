import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { USER_TOKEN_NAME } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private cookieService:CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.cookieService.get(USER_TOKEN_NAME);
    let tokenizedReq = req.clone({
      setHeaders: {
      Authorization: "Bearer "+token,
      }
    });
    return next.handle(tokenizedReq);
  }
}
