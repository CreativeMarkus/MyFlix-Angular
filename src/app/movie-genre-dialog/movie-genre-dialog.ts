/**
 * Dialog component for displaying movie genre information and descriptions.
 * Shows detailed information about the selected movie's genre including
 * description and characteristics of the genre type.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre-dialog',  // Component CSS selector
  standalone: false,                   // Part of NgModule
  templateUrl: './movie-genre-dialog.html',
  styleUrl: './movie-genre-dialog.scss',
})
export class MovieGenreDialogComponent {
  /**
   * Constructor injects dialog services and data
   * @param dialogRef - Reference to the dialog for closing
   * @param data - Movie data containing genre information
   */
  constructor(
    public dialogRef: MatDialogRef<MovieGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Closes the genre information dialog
   */
  onClose(): void {
    this.dialogRef.close();
  }
}
