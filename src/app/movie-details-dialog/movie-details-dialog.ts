/**
 * Dialog component for displaying comprehensive movie details and information.
 * Shows complete movie information including title, description, director,
 * genre, release year, and other metadata in a modal dialog.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details-dialog', // Component CSS selector
  standalone: false,                     // Part of NgModule
  templateUrl: './movie-details-dialog.html',
  styleUrl: './movie-details-dialog.scss',
})
export class MovieDetailsDialogComponent {
  /**
   * Constructor injects dialog services and data
   * @param dialogRef - Reference to the dialog for closing
   * @param data - Complete movie data object with all details
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Closes the movie details dialog
   */
  onClose(): void {
    this.dialogRef.close();
  }
}
