import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent        
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    CommonModule,
    FormsModule, 
    PagesModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
