/**
 * Dialog component for displaying director information and biography.
 * Shows detailed information about the movie's director including biography,
 * birth year, and filmography details.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director-dialog', // Component CSS selector
  standalone: false,                      // Part of NgModule
  templateUrl: './movie-director-dialog.html',
  styleUrl: './movie-director-dialog.scss',
})
export class MovieDirectorDialogComponent {
  /**
   * Constructor injects dialog services and data
   * @param dialogRef - Reference to the dialog for closing
   * @param data - Movie data containing director information
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Closes the director information dialog
   */
  onClose(): void {
    this.dialogRef.close();
  }
}
