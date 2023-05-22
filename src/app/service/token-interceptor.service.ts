import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("ok");
    let token = localStorage.getItem('user_token');
    console.log(token);
    let tokenizedReq = req.clone({
      setHeaders: {
      Authorization: "Bearer "+token,
      }
    });
    return next.handle(tokenizedReq);
  }
}
