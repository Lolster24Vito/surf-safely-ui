import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseDto } from '../model/api-response-dto';
import { LeaderboardRow } from '../model/leaderboard-row';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) { }
  getLeaderboardList():Observable<ApiResponseDto>{
    let response:ApiResponseDto = new ApiResponseDto();
    let leaderboardList:{username:string,ranking:number,totalPoints:number}[]=[
    {"username":"Pero","ranking":1,"totalPoints":200},
    {"username":"Pero","ranking":2,"totalPoints":150},
    {"username":"Pero","ranking":3,"totalPoints":100},
    ];
    response.data=leaderboardList;
    return of(response);
  }
}
