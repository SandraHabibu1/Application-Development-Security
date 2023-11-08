// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Define form controls for username and password
  username = new FormControl('');
  password = new FormControl('');

  // Variables for error handling
  hasError = false;
  errorMessage = '';

  // Constructor to inject Router and AuthService
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // Initialization code can be placed here if needed
  }

  // Function to handle form submission
  onSubmit(e: Event) {
    // Prevent the default form submission behavior
    e.preventDefault();
    this.hasError = false; // Reset error flags

    // Check if username and password are provided
    if (!this.username.value || !this.password.value) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    // Call the login method from the AuthService and handle the response
    this.auth.login(this.username.value, this.password.value).subscribe({
      next: (v: any) => {
        // Successful login: extract the token and store it in local storage
        const { token } = v;
        localStorage.setItem('x-auth-token', token);

        // Redirect to the home page
        this.router.navigate(['/']);
      },
      error: (e: any) => {
        // Error during login
        this.hasError = true;
        console.log(e);
        this.errorMessage = 'Error logging in, check username or password';
        
        if(e.status == 201)
        {
          this.hasError = false;
          this.router.navigate(['/home'])
        }
      }
    });
  }
}
