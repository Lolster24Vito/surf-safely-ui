import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL, USER_TOKEN_NAME} from "../config/config";
import { ApiResponseDto } from '../model/api-response-dto';
import { CookieService } from 'ngx-cookie-service';


export class UserDto {
  firstName?: string="";
  lastName?: string="";
  username: string | undefined="";
  password: string | undefined="";
  email?: string="";
  roleId?: number;
}

export interface UserDto {
  firstName?: string;
  lastName?: string;
  username: string|undefined;
  password: string|undefined;
  email?: string;
  roleId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiLoginUrl = `${BASE_URL}auth/login`;
  private apiLogoutUrl = `${BASE_URL}auth/logout`;
  private apiGetCurrentUser = `${BASE_URL}current-user`;


  constructor(private http: HttpClient,private cookieService:CookieService) { }

  login(user: UserDto): Observable<ApiResponseDto> {
    return this.http.post<ApiResponseDto>(this.apiLoginUrl, user);
  }
  logout(){
    this.cookieService.delete('user_token');
   return this.http.get<ApiResponseDto>(this.apiLogoutUrl);
  }
  isLoggedIn(){
    return this.cookieService.get(USER_TOKEN_NAME).length!==0;
  }
  getCurrentUser(){
    return this.http.get<ApiResponseDto>(this.apiGetCurrentUser);
  }
}