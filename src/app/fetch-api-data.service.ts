import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// API URL
const apiUrl = 'https://movieapi1-40cbbcb4b0ea.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log('Sending login data:', userDetails);
    return this.http.post(apiUrl + 'login', userDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie by ID
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

  // Get director
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies
  getFavouriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

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

  // Add favorite movie
  addFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
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

  // Edit user
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete favorite movie
  deleteFavouriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username + '/favorites/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
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
      catchError(this.handleError)
    );
  }

  // Extract response data
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

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
