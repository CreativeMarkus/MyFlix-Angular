import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre-dialog',
  standalone: false,
  templateUrl: './movie-genre-dialog.html',
  styleUrl: './movie-genre-dialog.scss',
})
export class MovieGenreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieGenreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
