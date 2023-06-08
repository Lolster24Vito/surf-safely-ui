import { Component } from '@angular/core';
import { QuizService,QuizDTO,SolveAttemptDto } from '../../service/quiz.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  quiz!:QuizDTO;
  quizAnswerFormGroup!:FormGroup;
  //0-100 used in progress-bar width and text
  quizCorrectPercentage:number=0;
  quizPointsEarned:number=-1;
  constructor(
    private route:ActivatedRoute,
    private quizService:QuizService,
    private authService:AuthenticationService,private router:Router,private formBuilder:FormBuilder){
      if (!authService.isLoggedIn()) {
        router.navigate(['login']);
      }
    }
   ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    console.log(productIdFromRoute);
     this.getQuiz(productIdFromRoute);
     this.quizAnswerFormGroup = this.formBuilder.group({});

     
    
  }

  private getQuiz(id:number){
   this.quizService.getQuizById(id).subscribe(data=>{
     //data.data is here because of ApiResponseDTO object in the spring boot backend 
     this.quiz = data.data;
     console.log(this.quiz);

     if (this.quiz && this.quiz.questionDtoList) {
      this.quiz.questionDtoList.forEach((question, i) => {
        if (question.answerDtoList) {
          question.answerDtoList.forEach((answer, j) => {
            this.quizAnswerFormGroup.addControl(
              `question-${i} answer-${j}`,
              this.formBuilder.control(false) // Default value for checkbox
            );
          });
        }
      });
    }

   });
  }
  getQuizAnswers(){
    const formValues = this.quizAnswerFormGroup.value;
    
    let answerIds:SolveAttemptDto={} as SolveAttemptDto;
    answerIds.answerIds=[];
    this.quiz.questionDtoList.forEach((question, i) => 
    {
      question.answerDtoList.forEach((answer, j) => 
      {
        //ng-reflect-name===[FormControlName] in html document
        const checkbox = document.querySelector(`[ng-reflect-name="question-${i} answer-${j}"]`) as HTMLInputElement;
        if (checkbox && checkbox.checked) {
          const questionId = i;
          const answerId = j;
          const value = checkbox.value;

          answerIds.answerIds.push(
            Number(value)
           );
        }
      });
    });
    console.log(answerIds);
    return answerIds;
  }
  submitQuizAnswers() {
    let answerIds:SolveAttemptDto=this.getQuizAnswers();
    console.log(answerIds);
    this.quizService.submitQuizAnswers(answerIds).subscribe({
      next: (response) => {
        console.log(response);
        this.quizCorrectPercentage=response.data.correctnessPercentage*100;
        this.quizPointsEarned=Math.trunc(response.data.correctnessPercentage*100);
      },
      error: (e) => console.error(e)
    }
    );

    }
}
