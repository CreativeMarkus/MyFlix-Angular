/**
 * Dialog component for displaying detailed movie synopsis/plot summary.
 * Displays the full description of a selected movie in a modal dialog.
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis-dialog',  // Component CSS selector
  standalone: false,                      // Part of NgModule
  templateUrl: './movie-synopsis-dialog.html',
  styleUrl: './movie-synopsis-dialog.scss',
})
export class MovieSynopsisDialogComponent {
  /**
   * Constructor injects dialog services and data
   * @param dialogRef - Reference to the dialog for closing
   * @param data - Movie data containing synopsis information
   */
  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Closes the synopsis dialog
   */
  onClose(): void {
    this.dialogRef.close();
  }
}
