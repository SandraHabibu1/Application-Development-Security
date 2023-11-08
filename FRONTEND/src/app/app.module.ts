import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importing the components
import { ErrorComponent } from './common/error/error.component';
//import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './pages-services/login/login.component';
import { RegisterComponent } from './pages-services/register/register.component';
import { HomeComponent } from './pages-services/home/home.component';
import { PostComponent } from './pages-services/post/post.component';
import { NavbarComponent } from './pages-services/navbar/navbar.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    RegisterComponent,
    HomeComponent,
    PostComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
