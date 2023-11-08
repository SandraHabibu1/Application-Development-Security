import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private readonly BASE_URL = 'https://localhost:3000'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  // Check if the user is logged in based on the presence of the token
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('x-auth-token');
    return !!token;
  }

  // Retrieve the user's token from local storage
  get token() {
    const token = localStorage.getItem('x-auth-token');
    console.log('Token retrieved:', token);
    return token;
  }
  

  login(username: string, password: string) {
    const credentials = { username: username, password: password };
    return this.http.post(`${this.BASE_URL}/api/auth`, credentials);
  }

  // Logout by removing the token from local storage
  logout(): void {
    localStorage.removeItem('x-auth-token');
  }

  // Register a new user with a POST request
  register(username: string, firstName: string, lastName: string, password: string) {
    return this.http.post(`${this.BASE_URL}/api/users`, {
      username,
      firstName,
      lastName,
      password
    });
  }
}
