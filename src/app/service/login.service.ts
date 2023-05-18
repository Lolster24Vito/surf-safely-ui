import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL} from "../config/config";
import { ApiResponseDto } from '../model/api-response-dto';


export class UserDto {
  firstName?: string;
  lastName?: string;
  username: string | undefined;
  password: string | undefined;
  email?: string;
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
export class LoginService {
  private apiUrl = `${BASE_URL}auth/login`;
  constructor(private http: HttpClient) { }

  login(user: UserDto): Observable<ApiResponseDto> {
    return this.http.post<ApiResponseDto>(this.apiUrl, user);
  }
}
