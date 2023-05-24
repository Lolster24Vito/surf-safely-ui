import { Component } from '@angular/core';
import { QuizService,QuizDTO } from '../service/quiz.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quiz!:QuizDTO;
  constructor(
    private route:ActivatedRoute,
    private quizService:QuizService,
    private authService:AuthenticationService,private router:Router){
      if (!authService.isLoggedIn()) {
        router.navigate(['login']);
      }
    }
   ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    console.log(productIdFromRoute);
     this.getQuiz(productIdFromRoute);
  }
  private getQuiz(id:number){
   this.quizService.getQuizById(id).subscribe(data=>{
     //data.data is here because of ApiResponseDTO object in the spring boot backend 
     this.quiz = data.data;
     console.log(this.quiz);
   });
  }
  getQuizAnswers(){

  }
}
