/**
 * User login form component displayed in a Material Dialog.
 * Handles user authentication by collecting credentials
 * and communicating with the API service.
 */
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',    // Component CSS selector
    standalone: false,                   // Part of NgModule
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

    // Input property for two-way data binding with login form
    @Input() userData = { Username: '', Password: '' };

    /**
     * Constructor injects dependencies for login functionality
     * @param fetchApiData - Service for API communication
     * @param dialogRef - Reference to the dialog containing this component
     * @param snackBar - Material snackbar for user feedback
     * @param router - Angular router for navigation after login
     */
    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router) { }

    /**
     * Component initialization lifecycle hook
     */
    ngOnInit(): void {
        // Component initialization logic goes here
    }

    /**
     * Handles user login authentication
     * Sends form data to API and processes the response
     */
    loginUser(): void {
        console.log('Login attempt with data:', this.userData); // Debug log
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
            localStorage.setItem('user', JSON.stringify(result.user)); // Store user data
            localStorage.setItem('token', result.token);
            this.dialogRef.close(); // This will close the modal on success!
            this.snackBar.open('User login successful!', 'OK', {
                duration: 2000
            });
            this.router.navigate(['movies']);
        }, (error) => {
            console.log('Login error:', error);
            console.log('Error status:', error.status);
            console.log('Error body:', error.error);

            let errorMessage = 'User login failed!';

            // Try different ways to extract the error message
            if (error.error) {
                if (typeof error.error === 'string') {
                    errorMessage = error.error;
                } else if (error.error.message) {
                    errorMessage = error.error.message;
                } else if (error.error.error) {
                    errorMessage = error.error.error;
                }
            }

            // Handle network connectivity issues
            if (error.status === 0) {
                errorMessage = 'Network connection error. Please check your internet connection and try again.';
            }
            // Fallback based on status codes
            else if (errorMessage === 'User login failed!') {
                if (error.status === 400) {
                    errorMessage = 'Invalid username/password. Please check your credentials.';
                } else if (error.status === 401) {
                    errorMessage = 'Unauthorized. Please check your credentials.';
                } else if (error.status === 404) {
                    errorMessage = 'User not found.';
                }
            }

            this.snackBar.open(errorMessage, 'OK', {
                duration: 2000
            });
        });
    }

}