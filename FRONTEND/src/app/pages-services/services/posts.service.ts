// Import necessary modules and libraries
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly BASE_URL = 'https://localhost:3000/api/posts'; // Update with your actual backend URL

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Function to get posts from the server
  getPosts(): Observable<any> {
    const token = this.auth.token;
    return this.http.get(this.BASE_URL, {
      headers: new HttpHeaders({
        'x-auth-token': token ?? '',
      }),
    }).pipe(
      catchError((error) => {
        // Handle errors and display an error message
        console.error('Error fetching posts:', error);
        return throwError('An error occurred while fetching posts');
      })
    );
  }

  // Function to add a new post
  add(title: string, description: string, departmentCode: string): Observable<any> {
    const token = this.auth.token;

    return this.http.post(
      this.BASE_URL,
      {
        title,
        description,
        departmentCode,
      },
      {
        headers: new HttpHeaders({
          'x-auth-token': token ?? '',
        }),
      }
    ).pipe(
      catchError((error) => {
        // Handle errors and display an error message
        console.error('Error adding post:', error);
        return throwError('An error occurred while adding a post');
      })
    );
  }

  // Function to delete a post by its ID
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${id}`, {
      headers: new HttpHeaders({
        'x-auth-token': this.auth.token ?? '',
      }),
    }).pipe(
      catchError((error) => {
        // Handle errors and display an error message
        console.error('Error deleting post:', error);
        return throwError('An error occurred while deleting a post');
      })
    );
  }
}
