import { Injectable } from '@angular/core';
import { ApiResponseDto } from '../model/api-response-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../config/config';
import { CheckUrlRequest } from '../model/checkUrl/check-url-request';

@Injectable({
  providedIn: 'root'
})
export class ScanService {


  private apiScanUrl = `${BASE_URL}checkUrl`;
  private apiScanFile = `${BASE_URL}checkFile`;

  constructor(private http: HttpClient) { }
  
  scanUrl(urlText: string) {
    let checkUrlRequest:CheckUrlRequest=new CheckUrlRequest(urlText);
     
    return this.http.post<ApiResponseDto>(this.apiScanUrl,checkUrlRequest);
  }

  scanFile(formData: FormData): Observable<ApiResponseDto> {
    return this.http.post<ApiResponseDto>(this.apiScanFile, formData);
  }
}
