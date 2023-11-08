import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostsService } from '../services/posts.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = []; // Array to store posts
  title = new FormControl(''); // Form control for post title
  description = new FormControl(''); // Form control for post description
  department = new FormControl(''); // Form control for post department
  hasError = false; // Flag to indicate if an error occurred
  errorMessage = ''; // Error message

  constructor(
    private router: Router,
    private auth: AuthService, // Authentication service
    private postsService: PostsService, // Service to manage posts
    private http: HttpClient // HTTP client for making API requests
  ) {}

  ngOnInit(): void {
    const baseUrl = 'https://localhost:3000/api/posts'; // Base URL for the API

    // Make an HTTP GET request to fetch posts from the API
    this.http
      .get(baseUrl, {
        headers: new HttpHeaders({
          'x-auth-token': this.auth.token ?? '', // Include the authentication token if available
        }),
      })
      .subscribe(
        (response: any) => {
          this.posts = response; // Assign the retrieved posts to the local array
        },
        (error) => {
          console.error('Error fetching posts:', error); // Log an error if fetching posts fails
          this.hasError = true; // Set the error flag
          this.errorMessage = 'An error has occurred while fetching posts.'; // Display an error message
          console.error(error); // Log the error for debugging
        }
      );
  }

  // Function to delete a post
  deletePost(id: string) {
    console.log('A post has been deleted'); // Log the deletion action

    // Call the postsService to delete the post
    this.postsService
      .delete(id)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.log(e),
      });

    // Remove the deleted post from the local array
    const filtered = this.posts.filter((post) => post._id !== id);
    this.posts = filtered;
  }
}
