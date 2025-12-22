/**
 * Service for handling API communication with the movie database backend.
 * Provides methods for user authentication, movie data retrieval,
 * and favorite movie management.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Base URL for the movie API endpoint
const apiUrl = 'https://movieapi1-40cbbcb4b0ea.herokuapp.com/';

@Injectable({
  providedIn: 'root'  // Service available application-wide
})
export class FetchApiDataService {
  /**
   * Constructor injects HttpClient for making HTTP requests
   * @param http - Angular's HttpClient for API communication
   */
  constructor(private http: HttpClient) {
    // HttpClient injected for HTTP operations
  }

  /**
   * Registers a new user with the API
   * @param userDetails - Object containing user registration data (username, password, email, birthday)
   * @returns Observable<any> - API response with user data or error
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails); // Debug log for registration data
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError) // Handle any registration errors
    );
  }

  /**
   * Authenticates user login credentials
   * @param userDetails - Object containing username and password
   * @returns Observable<any> - API response with user data and JWT token
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log('Sending login data:', userDetails); // Debug log for login attempt
    return this.http.post(apiUrl + 'login', userDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // Ensure JSON content type
      })
    }).pipe(
      catchError(this.handleError) // Handle authentication errors
    );
  }

  /**
   * Retrieves all movies from the database
   * Requires user authentication via JWT token
   * @returns Observable<any> - Array of movie objects
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token'); // Get stored JWT token
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT token for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract data from response
      catchError(this.handleError)    // Handle any request errors
    );
  }

  /**
   * Retrieves a specific movie by its unique identifier
   * @param movieId - String ID of the movie to retrieve
   * @returns Observable<any> - Single movie object with details
   */
  getOneMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves information about a specific director by name.
   * @param directorName - The name of the director to search for
   * @returns Observable<any> - Director information including biography and birth year
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve auth token
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      catchError(this.handleError)    // Handle any request errors
    );
  }

  /**
   * Retrieves information about a specific movie genre.
   * @param genreName - The name of the genre to search for
   * @returns Observable<any> - Genre information including description
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve auth token
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      catchError(this.handleError)    // Handle any request errors
    );
  }

  /**
   * Retrieves the current user's profile information.
   * Gets user data from localStorage and fetches updated profile from API.
   * @returns Observable<any> - User profile data including username, email, and favorites
   */
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse stored user data
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'), // Include JWT token
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      catchError(this.handleError)    // Handle any request errors
    );
  }

  /**
   * Retrieves the current user's favorite movies list.
   * Includes fallback to localStorage if API response is empty.
   * @returns Observable<any> - Array of favorite movie IDs
   */
  getFavouriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse stored user data
    const token = localStorage.getItem('token'); // Get auth token

    // Get favorites from localStorage as backup
    const localFavorites = user.FavoriteMovies || user.Favorites || user.favoriteMovies || user.favorites || [];

    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => {
        const apiFavorites = data.FavoriteMovies || data.Favorites || data.favoriteMovies || data.favorites;
        // If API returns empty or undefined favorites but we have local favorites, use local
        if ((!apiFavorites || apiFavorites.length === 0) && localFavorites.length > 0) {
          console.log('Using localStorage favorites:', localFavorites);
          return localFavorites;
        }
        return apiFavorites || [];
      }),
      catchError((error) => {
        console.log('API error, using localStorage favorites:', localFavorites);
        return of(localFavorites);
      })
    );
  }

  /**
   * Adds a movie to the user's favorites list.
   * Updates both API database and localStorage for consistency.
   * @param movieId - The unique identifier of the movie to add to favorites
   * @returns Observable<any> - Updated user data or confirmation response
   */
  addFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user data
    const token = localStorage.getItem('token'); // Get auth token
    return this.http.post(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      map((data) => {
        // Update localStorage user data if API returns updated user
        if (data && data.Username) {
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          // If API doesn't return user data, manually update localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const currentFavorites = currentUser.FavoriteMovies || [];
          if (!currentFavorites.includes(movieId)) {
            currentFavorites.push(movieId);
            currentUser.FavoriteMovies = currentFavorites;
            localStorage.setItem('user', JSON.stringify(currentUser));
          }
        }
        return data;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Updates user profile information in the database.
   * @param updatedUser - Object containing the updated user information
   * @returns Observable<any> - Updated user profile data
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get current user
    const token = localStorage.getItem('token'); // Get auth token
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      catchError(this.handleError)    // Handle any request errors
    );
  }

  /**
   * Deletes the current user's account from the database.
   * This action is irreversible and will remove all user data.
   * @returns Observable<any> - Deletion confirmation response
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get current user
    const token = localStorage.getItem('token'); // Get auth token
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      catchError(this.handleError) // Handle any request errors
    );
  }

  /**
   * Removes a movie from the user's favorites list.
   * Updates both API database and localStorage for consistency.
   * @param movieId - The unique identifier of the movie to remove from favorites
   * @returns Observable<any> - Updated user data or confirmation response
   */
  deleteFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Get user data
    const token = localStorage.getItem('token'); // Get auth token
    return this.http.delete(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token, // Include JWT for authentication
      })
    }).pipe(
      map(this.extractResponseData), // Extract response data
      map((data) => {
        // Update localStorage user data if API returns updated user
        if (data && data.Username) {
          localStorage.setItem('user', JSON.stringify(data));
        } else {
          // If API doesn't return user data, manually update localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          let currentFavorites = currentUser.FavoriteMovies || [];
          currentFavorites = currentFavorites.filter((id: string) => id !== movieId);
          currentUser.FavoriteMovies = currentFavorites;
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
        return data;
      }),
      catchError(this.handleError) // Handle any request errors
    );
  }

  /**
   * Extracts the response data from HTTP responses.
   * @private
   * @param res - The HTTP response object
   * @returns {any} The extracted response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {}; // Return response body or empty object as fallback
  }

  /**
   * Handles HTTP error responses and provides error logging.
   * @private
   * @param error - The HTTP error response object
   * @returns {Observable<never>} An observable that throws the error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is:`, error.error);
    }
    return throwError(error);
  }
}
