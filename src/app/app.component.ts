/**
 * Main application component for the MyFlix Angular client.
 * This is the root component that serves as the entry point for the application.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',       // CSS selector for this component
  standalone: false,          // Component is part of NgModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Application title displayed in the browser tab
  title = 'myFlix-Angular-client';
}