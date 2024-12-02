import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator'

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
    PagesModule, BrowserAnimationsModule,
    MatPaginatorModule
   
  ],
  providers: [
    provideAnimations() // Angular Material Animations
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
