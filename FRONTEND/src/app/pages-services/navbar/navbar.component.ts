// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variable to track user login status
  isLoggedIn = false;

  // Constructor to inject Router and AuthService
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // Subscribe to router events to detect changes in navigation
    this.router.events.subscribe((event) => {
      // Check if the event is a navigation end event
      if (event.constructor.name === 'NavigationEnd') {
        // Update the isLoggedIn status based on the user's authentication state
        this.isLoggedIn = this.auth.isLoggedIn;
      }
    });
  }

  // Function to handle user logout
  logout() {
    // Call the logout method from AuthService to log the user out
    this.auth.logout();

    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }
}
