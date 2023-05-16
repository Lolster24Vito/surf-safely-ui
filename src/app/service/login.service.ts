import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BASE_URL} from "../config/config";


interface UserDto {
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email?: string;
  roleId?: number;
}

export class UserDto {
  firstName?: string;
  lastName?: string;
  username: string | undefined;
  password: string | undefined;
  email?: string;
  roleId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = `${BASE_URL}auth/login`;
  constructor(private http: HttpClient) { }

  login(user: UserDto): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
