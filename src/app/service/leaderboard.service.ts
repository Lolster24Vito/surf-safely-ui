import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseDto } from '../model/api-response-dto';
import { LeaderboardRow } from '../model/leaderboard-row';
import { Observable, of } from 'rxjs';
import {BASE_URL} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  private leaderboardApiUrl:string=`${BASE_URL}leaderboard`
  private getUserByIdApiUrl:string=`${BASE_URL}leaderboard/user/`//+id

  constructor(private http: HttpClient) { }
  getLeaderboardList():Observable<ApiResponseDto>{
    return this.http.get<ApiResponseDto>(this.leaderboardApiUrl);
  }
  getUserById(id:number):Observable<ApiResponseDto>{
    return this.http.get<ApiResponseDto>(this.getUserByIdApiUrl+id);
    
  }
}
