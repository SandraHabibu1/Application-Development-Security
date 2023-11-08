// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // Form controls for user registration details
  username = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');

  // Variables to handle errors and error messages
  hasError = false;
  errorMessage = '';

  // Constructor to inject Router and AuthService
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  // Function to handle user registration form submission
  onSubmit(e: Event) {
    e.preventDefault();
    this.hasError = false;
    this.errorMessage = '';

    // Check if all required values are provided
    if (
      !this.username.value ||
      !this.password.value ||
      !this.confirmPassword.value ||
      !this.firstName.value ||
      !this.lastName.value
    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all the fields ';
      return;
    }

    // Check if the provided passwords match
    if (this.password.value !== this.confirmPassword.value) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Call the AuthService to register the user
    this.auth
      .register(
        this.username.value,
        this.firstName.value,
        this.lastName.value,
        this.password.value
      )
      .subscribe({
        next: () => {
          // Redirect the user to the login page upon successful registration
          this.router.navigate(['/login']);
        },
        error: (e) => {
          this.hasError = true;
          console.log(e);
          this.errorMessage = 'Error during registration. Please try again.';
        }
      });
  }
}
