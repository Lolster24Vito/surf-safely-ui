import { Injectable } from '@angular/core';
import { ApiResponseDto } from '../model/api-response-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../config/config';
import { CheckUrlRequest } from '../model/checkUrl/check-url-request';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  private apiScan = `${BASE_URL}checkUrl`;

  constructor(private http: HttpClient) { }
  
  scanUrl(urlText: string) {
    let checkUrlRequest:CheckUrlRequest=new CheckUrlRequest(urlText);
     
    return this.http.post<ApiResponseDto>(this.apiScan,checkUrlRequest);
  }
}
