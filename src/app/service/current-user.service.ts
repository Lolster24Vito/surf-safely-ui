import {Injectable} from '@angular/core';
import { BASE_URL } from '../config/config';
import { ApiResponseDto } from '../model/api-response-dto';
import { HttpClient } from '@angular/common/http';
import { ChangeUserInformationDto } from '../model/change-user-information-dto';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) { }
  private apiGetCurrentUser = `${BASE_URL}current-user`;
  private apiChangePersonalData = `${BASE_URL}current-user/update-personal-information`;
  private apiDeleteAccount = `${BASE_URL}current-user/delete-account`;
  private apiGetPoints = `${BASE_URL}current-user/get-points`;



  getCurrentUser(){
    return this.http.get<ApiResponseDto>(this.apiGetCurrentUser);
  }

  changePersonalData(changeUserInformationDto:ChangeUserInformationDto) { 
    return this.http.post<ApiResponseDto>(this.apiChangePersonalData,changeUserInformationDto);
  }
  deleteAccount(){
    return this.http.delete<ApiResponseDto>(this.apiDeleteAccount);
  }
  getCurrentUserPoints(){
    return this.http.get<ApiResponseDto>(this.apiGetPoints);
  }
}
