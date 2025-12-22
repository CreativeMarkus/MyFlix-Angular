/**
 * Movies component responsible for authentication check and displaying movies.
 * Serves as a wrapper component that verifies user login status and
 * automatically opens the movies dialog for browsing the movie collection.
 */
import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',       // Component CSS selector
  standalone: false,            // Part of NgModule
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class MoviesComponent implements OnInit {

  /**
   * Constructor injects required services
   * @param dialog - Material dialog service for opening movie cards
   * @param router - Angular router for navigation
   */
  constructor(public dialog: MatDialog, private router: Router) { }

  /**
   * Angular OnInit lifecycle hook
   * Checks user authentication and opens movies dialog if authenticated
   */
  ngOnInit(): void {
    // Check if user is logged in, if not redirect to welcome
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    // Open movies dialog automatically when component loads
    this.openMoviesDialog();
  }

  /**
   * Opens the movies dialog with responsive dimensions
   * Automatically navigates back to welcome page when dialog closes
   */
  openMoviesDialog(): void {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      width: '80vw',
      maxWidth: '1200px',
      height: '80vh',
      maxHeight: '800px'
    });

    // Navigate back to welcome when dialog closes
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['welcome']);
    });
  }
}
