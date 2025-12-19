import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Initialize empty array - don't call API here to avoid change detection errors
  }

  ngAfterViewInit(): void {
    // Call API after view is initialized to prevent change detection errors
    this.loadUserData();
    this.getMovies();
    this.getFavoriteMovies();
  }

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

  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null && localStorage.getItem('user') !== null;
  }

  onImageError(event: any): void {
    console.log('Image failed to load:', event.target.src);
    // Set a fallback image that should work
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIj5Nb3ZpZTwvdGV4dD4KPHR0ZXh0IHg9IjE1MCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsIj5Qb3N0ZXI8L3RleHQ+Cjwvc3ZnPgo=';
  }

  trackByMovieId(index: number, movie: any): string {
    return movie._id || index.toString();
  }

  setImageError(movie: any): void {
    console.log('Image failed to load for:', movie.Title);
    movie.imageError = true;
    this.cdr.detectChanges();
  }

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

  showMovieDetails(movie: any): void {
    console.log('Movie clicked:', movie);
    this.dialog.open(MovieDetailsDialogComponent, {
      width: '600px',
      data: movie
    });
  }
}
