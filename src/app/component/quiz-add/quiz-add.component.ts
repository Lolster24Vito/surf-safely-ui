import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService,UserDto } from 'src/app/service/authentication.service';
import { QuizDTO, QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-add',
  templateUrl: './quiz-add.component.html',
  styleUrls: ['./quiz-add.component.css']
})
export class QuizAddComponent {
  quizForm:FormGroup;
  currentUser!:UserDto;
  constructor(private fb: FormBuilder,private quizService: QuizService,private authService:AuthenticationService,private router:Router) {
    this.quizForm = this.fb.group({
      title: ['',{validators: [Validators.required],},
    ],
    description:['',{validators: [Validators.required]},],
    questionDtoList: this.fb.array([])
    });
    authService.getCurrentUser().subscribe({next:(response)=>this.currentUser=response.data});
  }

  questions():FormArray {
     return this.quizForm.get('questionDtoList') as FormArray; 
    }
    newQuestion(): FormGroup {
      return this.fb.group({
        questionText: '',
        answerDtoList:this.fb.array([])
      })
    }
    addQuestion() {
      this.questions().push(this.newQuestion());
    }
    removeQuestion(questionIndex:number) {
      this.questions().removeAt(questionIndex);
    }

questionAnswers(questionIndex:number) : FormArray {
  return this.questions().at(questionIndex).get("answerDtoList") as FormArray
}
newAnswer(): FormGroup {
  return this.fb.group({
    text: '',
    isCorrect: false
  })
}

addQuestionAnswer(questionIndex:number) {
  this.questionAnswers(questionIndex).push(this.newAnswer());
}
removedQuestionAnswer(questionIndex:number,answerIndex:number) {
  this.questionAnswers(questionIndex).removeAt(answerIndex);
}
onSubmit() {
  console.log(this.quizForm.value);
  var quizDtoClass:QuizDTO=this.quizForm.value;
  quizDtoClass.author=this.currentUser.username!;
  console.log(quizDtoClass,"classsss");
  this.quizService.saveQuiz(quizDtoClass).subscribe({
    next: (response) => {
      this.router.navigate(['/quiz-list']);
    },
    error: (e) => console.error(e)
  }
  );
}

  
}
