/**
 * Welcome page component serving as the application's landing page.
 * Provides entry points for user registration, login, and browsing movies.
 * Acts as the main navigation hub for unauthenticated and authenticated users.
 */
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MovieCardComponent } from '../movie-card/movie-card';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',    // Component CSS selector
  standalone: false,               // Part of NgModule
  templateUrl: './welcome-page.html',
  styleUrls: ['./welcome-page.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Constructor injects Material dialog service
   * @param dialog - Material dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Angular OnInit lifecycle hook
   * Currently no initialization logic required
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog
   * Displays a modal form for new user registration
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog
   * Displays a modal form for user authentication
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the movies browsing dialog
   * Displays the full movie collection in a responsive modal
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '80vw',
      maxWidth: '1200px',
      height: '80vh',
      maxHeight: '800px'
    });
  }
}
