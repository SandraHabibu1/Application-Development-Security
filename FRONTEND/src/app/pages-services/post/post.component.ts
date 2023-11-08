// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // Form controls for post details
  title = new FormControl('');
  description = new FormControl('');
  departmentCode = new FormControl('');

  // Variables to handle errors and error messages
  hasError = false;
  errorMessage = '';

  // Constructor to inject Router, AuthService, and PostsService
  constructor(
    private router: Router,
    private auth: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    // Check if the user is logged in; if not, redirect to the login page
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
  }

  // Function to add a new post
  addNewPost(e: Event) {
    // Setting the defaults
    e.preventDefault();
    this.hasError = false;

    // Check if all required values are provided
    if (
      !this.title.value ||
      !this.description.value ||
      !this.departmentCode.value
    ) {
      this.hasError = true;
      this.errorMessage = 'Please fill in all values before continuing';
      return;
    }

    // Call the postsService to add a new post
    this.postsService
      .add(this.title.value, this.description.value, this.departmentCode.value)
      .subscribe({
        next: (v) => {
          // Clear form fields after successfully adding a post
          this.title.setValue('');
          this.description.setValue('');
          this.departmentCode.setValue('');
        },
        error: (e) => {
          // Handle and display errors
          this.hasError = true;
          this.errorMessage = e.error;
          console.log(e);
        }
      });
  }
}
