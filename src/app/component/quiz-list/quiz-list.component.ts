import { Component,OnInit } from '@angular/core';
import { QuizService,QuizDTO } from '../../service/quiz.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  quizzes!:QuizDTO[];
  loggedIn:boolean = false;
 constructor(private quizService:QuizService,private authService:AuthenticationService,private router:Router) {
  if (!authService.isLoggedIn()) {
    router.navigate(['login']);
  }
  else{
    this.loggedIn=true;
  }
 }
  ngOnInit(): void {
    if(this.loggedIn) {
    this.getQuizzes();
    }
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
