import { Component,OnInit } from '@angular/core';
import { QuizService,QuizDTO } from '../service/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes!:QuizDTO[];
 constructor(private quizService:QuizService){}
  ngOnInit(): void {
    this.getQuizzes();
    
 }
 private getQuizzes(){
  this.quizService.getQuizList().subscribe(data=>{
    //data.data is here because of ApiResponseDTO object in the spring boot backend 
    this.quizzes = data.data;
    console.log(this.quizzes);
  });
 }
 onMouseEnter(hoverName: HTMLElement) {
  hoverName.style.color = "#1AD9C6";
}

onMouseOut(hoverName: HTMLElement) {
  hoverName.style.color = "white";
}

}
