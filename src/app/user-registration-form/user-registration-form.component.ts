/**
 * User registration form component for new user sign-up.
 * Displays in a Material Dialog and handles user account creation
 * with form validation and API communication.
 */
import { Component, OnInit, Input } from '@angular/core';

// Import for closing the dialog on successful registration
import { MatDialogRef } from '@angular/material/dialog';

// Import for API calls and data service communication
import { FetchApiDataService } from '../fetch-api-data.service';

// Import for displaying user notifications and feedback
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',  // Component CSS selector
  standalone: false,                       // Part of NgModule
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  // Input property for two-way data binding with registration form fields
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructor injects services needed for user registration
   * @param fetchApiData - Service for API communication
   * @param dialogRef - Reference to the dialog containing this component
   * @param snackBar - Material snackbar for user feedback messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  /**
   * Component initialization lifecycle hook
   */
  ngOnInit(): void {
    // Component initialization logic
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User registration successful!', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.log('Registration error:', error);
      let errorMessage = 'User registration failed!';

      if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.status === 409) {
        errorMessage = 'User already exists. Please try logging in instead.';
      }

      this.snackBar.open(errorMessage, 'OK', {
        duration: 2000
      });
    });
  }

}