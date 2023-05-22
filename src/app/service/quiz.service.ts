import { Injectable } from '@angular/core';
import {BASE_URL} from "../config/config";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseDto } from '../model/api-response-dto';


export class QuizDTO {
  id!:number;
  title!:string;
  description!:string;
  author!:string;
  questionDtoList!:QuestionDTO[];
}
export class QuestionDTO {
  id!:number;
  questionText!:string;
  answerDtoList!:AnswerDTO[];
  quizId!:number;
}
export class AnswerDTO {
  id!:number;
  text!:string;
  isCorrect!:boolean;
  questionId!:number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiAllQuizUrl = `${BASE_URL}quiz/all`;
  private apiQuizByIdUrl = `${BASE_URL}quiz/`;

 /* private httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('user_token')
    })
};*/

  constructor(private http: HttpClient) { }
  getQuizList(): Observable<ApiResponseDto> {
    return this.http.get<ApiResponseDto>(this.apiAllQuizUrl);
  }
  getQuizById(id:number): Observable<ApiResponseDto> {
    return this.http.get<ApiResponseDto>(this.apiQuizByIdUrl + id);
  }

}
