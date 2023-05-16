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
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterOutlet,
    AppRoutingModule,
    NgOptimizedImage,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
