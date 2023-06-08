import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ApiResponseDto } from '../model/api-response-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private currentUserAvatarUrl=`${BASE_URL}avatar/currentUser`;
  private currentUserAvatarsUrl=`${BASE_URL}avatar/currentUser/all`;
  private allAvatarsUrl=`${BASE_URL}avatar/all`;
  private makeMainUrl=`${BASE_URL}avatar/makeMain/`;//+id
  private buyAvatarUrl=`${BASE_URL}avatar/buy/`;//+id
  

  constructor(private http: HttpClient) { }
  
  getCurrentUserAvatar(): Observable<ApiResponseDto> {
      return this.http.get<ApiResponseDto>(this.currentUserAvatarUrl);
  }
  getCurrentUserAvatars(): Observable<ApiResponseDto> {
    return this.http.get<ApiResponseDto>(this.currentUserAvatarsUrl);
}
  getAllAvatars(): Observable<ApiResponseDto> {
    return this.http.get<ApiResponseDto>(this.allAvatarsUrl);
  }
  makeMainAvatar(id:number): Observable<ApiResponseDto> {
    return this.http.post<ApiResponseDto>(this.makeMainUrl+id,null);
  }
  buyAvatar(id:number): Observable<ApiResponseDto>{
    return this.http.post<ApiResponseDto>(this.buyAvatarUrl+id,null);
  }
}
