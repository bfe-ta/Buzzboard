import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';    
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,  
    FormsModule,  
    HttpClientModule,
    AppComponent,
    LoginComponent,
    ContentComponent
  ],
  providers: [],
})
export class AppModule { }
