import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterOutlet} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {NgOptimizedImage} from "@angular/common";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { RouterModule,Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import {CookieService} from 'ngx-cookie-service';
import { ScanComponent } from './scan/scan.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    QuizListComponent,
    QuizComponent,
    ScanComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    NgOptimizedImage,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'quiz-list', component: QuizListComponent },
      { path: 'quiz/:id', component: QuizComponent},
      { path:'scan',component: ScanComponent},
      { path:'profile',component: ProfileComponent}
    ]),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
