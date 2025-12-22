/**
 * Component for displaying movie cards in a grid layout.
 * Handles movie data display, favorites management, and dialog interactions
 * for viewing movie details, genres, directors, and synopses.
 */
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog';
import { MovieGenreDialogComponent } from '../movie-genre-dialog/movie-genre-dialog';
import { MovieDirectorDialogComponent } from '../movie-director-dialog/movie-director-dialog';
import { MovieSynopsisDialogComponent } from '../movie-synopsis-dialog/movie-synopsis-dialog';

@Component({
  selector: 'app-movie-card',     // Component selector
  standalone: false,              // Part of NgModule
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  // Array to store all movies fetched from API
  movies: any[] = [];

  // Array to store user's favorite movie IDs
  favoriteMovies: string[] = [];

  // Object to store current user information
  user: any = {};

  /**
   * Constructor injects required services and dependencies
   * @param fetchApiData - Service for API communication
   * @param cdr - Change detection reference for manual updates
   * @param dialog - Material dialog service for popups
   * @param snackBar - Material snackbar for user notifications
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Component initialization lifecycle hook
   * Initializes empty arrays - API calls made in AfterViewInit to avoid change detection errors
   */
  ngOnInit(): void {
    // Initialize component state - API calls moved to AfterViewInit
  }

  /**
   * Lifecycle hook that runs after the component's view has been fully initialized.
   * Loads user data, fetches movies, and retrieves user's favorite movies.
   * Using AfterViewInit prevents change detection errors during initialization.
   */
  ngAfterViewInit(): void {
    // Call API after view is initialized to prevent change detection errors
    this.loadUserData();
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetches all movies from the API service.
   * If API call fails, falls back to sample movie data for demonstration.
   * Triggers change detection after data is loaded.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies received:', this.movies);
      // Manually trigger change detection after data is loaded
      this.cdr.detectChanges();
      return this.movies;
    }, (error) => {
      console.log('Error fetching movies:', error);
      // Add some sample movie data for demonstration
      this.movies = [
        {
          _id: '1',
          Title: 'The Shawshank Redemption',
          Director: { Name: 'Frank Darabont' },
          Genre: { Name: 'Drama' },
          Description: 'Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.',
          ImagePath: 'https://m.media-amazon.com/images/I/51rXi2SXCXL._AC_.jpg',
          imageError: false
        },
        {
          _id: '2',
          Title: 'The Godfather',
          Director: { Name: 'Francis Ford Coppola' },
          Genre: { Name: 'Crime' },
          Description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
          ImagePath: 'https://m.media-amazon.com/images/I/510L5ypQBdL._AC_SL1024_.jpg',
          imageError: false
        },
        {
          _id: '3',
          Title: 'Pulp Fiction',
          Director: { Name: 'Quentin Tarantino' },
          Genre: { Name: 'Crime' },
          Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
          ImagePath: 'https://m.media-amazon.com/images/I/61Z4YX7EbtL._AC_.jpg',
          imageError: false
        }
      ];
      console.log('Using fallback movie data:', this.movies);
      this.cdr.detectChanges();
    });
  }

  /**
   * Loads user data from localStorage and parses it into the user object.
   * Called during component initialization to restore user session data.
   */
  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  /**
   * Checks if a user is currently logged in by verifying the presence
   * of authentication token and user data in localStorage.
   * @returns {boolean} True if user is logged in, false otherwise
   */
  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null && localStorage.getItem('user') !== null;
  }

  /**
   * Handles image loading errors by setting a fallback SVG image.
   * Called when a movie poster image fails to load.
   * @param event - The error event from the failed image load
   */
  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);
    // Set a fallback image that should work
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIj5Nb3ZpZTwvdGV4dD4KPHR0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIj5Qb3N0ZXI8L3RleHQ+Cjwvc3ZnPgo=';
  }

  /**
   * TrackBy function for ngFor to optimize rendering performance.
   * Returns a unique identifier for each movie to prevent unnecessary re-renders.
   * @param index - The index of the movie in the array
   * @param movie - The movie object
   * @returns {string} Unique identifier for the movie
   */
  trackByMovieId(index: number, movie: any): string {
    return movie._id || index.toString();
  }

  /**
   * Sets the image error flag for a specific movie and triggers change detection.
   * @param movie - The movie object that failed to load its image
   */
  setImageError(movie: any): void {
    console.log('Image failed to load for:', movie.Title);
    movie.imageError = true;
    this.cdr.detectChanges();
  }

  /**
   * Clears the image error flag for a specific movie when image loads successfully.
   * @param movie - The movie object that successfully loaded its image
   */
  clearImageError(movie: any): void {
    console.log('Image loaded successfully for:', movie.Title);
    movie.imageError = false;
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((result: any) => {
      this.favoriteMovies = result || [];
      console.log('Movie card - Favorite movies from API:', this.favoriteMovies);
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Error fetching favorite movies:', error);
      this.favoriteMovies = [];
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFromFavorites(movie._id);
    } else {
      this.addToFavorites(movie._id);
    }
  }

  addToFavorites(movieId: string): void {
    console.log('Adding movie to favorites:', movieId);
    console.log('Current user:', this.user);
    console.log('API URL will be:', `https://movieapi1-40cbbcb4b0ea.herokuapp.com/users/${this.user.Username}/favorites/${movieId}`);

    this.fetchApiData.addFavouriteMovie(movieId).subscribe((result: any) => {
      console.log('Add favorite API response:', result);
      this.favoriteMovies.push(movieId);
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 2000 });

      // Refresh favorites list to ensure sync
      this.getFavoriteMovies();
      this.cdr.detectChanges();
    }, (error) => {
      console.error('Error adding to favorites:', error);
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      console.error('API URL:', error.url);

      if (error.status === 0) {
        this.snackBar.open('Network connection error. Please check your internet connection.', 'OK', { duration: 5000 });
      } else {
        this.snackBar.open('Error adding movie to favorites', 'OK', { duration: 3000 });
      }
    });
  }

  /**
   * Removes a movie from the user's favorites list via API call.
   * Shows success/error notifications and refreshes the favorites list.
   * @param movieId - The unique identifier of the movie to remove from favorites
   */
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((result: any) => {
      this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
      this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 2000 });

      // Refresh favorites list to ensure sync
      this.getFavoriteMovies();
      this.cdr.detectChanges();
    }, (error) => {
      console.error('Error removing from favorites:', error);
      this.snackBar.open('Error removing movie from favorites', 'OK', { duration: 3000 });
    });
  }

  /**
   * Opens a dialog displaying detailed information about a specific movie.
   * @param movie - The movie object containing details to display
   */
  showMovieDetails(movie: any): void {
    console.log('Movie clicked:', movie);
    this.dialog.open(MovieDetailsDialogComponent, {
      width: '600px',
      data: movie
    });
  }

  /**
   * Opens a dialog displaying information about the movie's genre.
   * @param movie - The movie object containing genre information
   */
  showGenreDetails(movie: any): void {
    console.log('Genre clicked:', movie.Genre);
    this.dialog.open(MovieGenreDialogComponent, {
      width: '400px',
      data: movie
    });
  }

  /**
   * Opens a dialog displaying information about the movie's director.
   * @param movie - The movie object containing director information
   */
  showDirectorDetails(movie: any): void {
    console.log('Director clicked:', movie.Director);
    this.dialog.open(MovieDirectorDialogComponent, {
      width: '500px',
      data: movie
    });
  }

  /**
   * Opens a dialog displaying the movie's synopsis/description.
   * @param movie - The movie object containing synopsis information
   */
  showSynopsisDetails(movie: any): void {
    console.log('Synopsis clicked:', movie);
    this.dialog.open(MovieSynopsisDialogComponent, {
      width: '600px',
      data: movie
    });
  }
}
