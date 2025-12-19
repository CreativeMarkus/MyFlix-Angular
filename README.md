# myFlix Angular Client

A complete Angular 17+ client application for the myFlix movie database, featuring user authentication, movie browsing, favorites management, and user profiles. Built with Angular Material and deployed on GitHub Pages.

## 🌐 Live Application

**[View Live Application →](https://creativemarkus.github.io/MyFlix-Angular/)**

## ✨ Features

### Core Functionality
✅ **Welcome Screen**: Professional landing page with registration and login options  
✅ **User Registration**: Secure account creation with form validation  
✅ **User Authentication**: Login system with JWT token management  
✅ **Movie Catalog**: Browse complete movie database with detailed information  
✅ **Movie Details**: View comprehensive movie information, director, and genre details  
✅ **Favorites System**: Add/remove movies from personal favorites with localStorage backup  
✅ **User Profile**: Manage account details and view favorite movies collection  
✅ **Responsive Navigation**: Clean navbar with user-specific options  

### Technical Features  
✅ **Angular Material**: Professional UI with consistent Material Design  
✅ **API Integration**: Full backend connectivity with fallback mechanisms  
✅ **NgModule Architecture**: Traditional Angular module structure  
✅ **Local Storage**: Persistent user data and favorites backup  
✅ **GitHub Pages**: Automated deployment pipeline  
✅ **Error Handling**: Comprehensive error management and user feedback  

## 🛠️ Technology Stack

- **Angular 17+**: Modern framework with NgModule-based architecture
- **Angular Material**: Complete UI component library with theming
- **TypeScript**: Full type safety and modern JavaScript features
- **RxJS**: Reactive programming for HTTP API calls and state management
- **Angular Router**: SPA navigation and route protection
- **FormsModule**: Two-way data binding with validation
- **SCSS**: Custom styling with Material Design theming
- **angular-cli-ghpages**: Automated GitHub Pages deployment
- **Backend API**: Live Heroku backend at `https://movieapi1-40cbbcb4b0ea.herokuapp.com/`

## 📱 Components & Architecture

### Core Components
- **AppComponent**: Main application shell with routing
- **WelcomePageComponent**: Landing page with authentication entry points
- **UserRegistrationFormComponent**: Account creation with validation
- **UserLoginFormComponent**: Authentication with token management
- **NavbarComponent**: Navigation bar with user-specific menu options
- **MoviesComponent**: Movie catalog display with search and filtering
- **UserProfileComponent**: Profile management and favorites display
- **MovieCardComponent**: Individual movie display cards

### Dialog Components
- **MovieDetailsDialogComponent**: Complete movie information modal
- **MovieDirectorDialogComponent**: Director biography and details
- **MovieGenreDialogComponent**: Genre information and descriptions
- **MovieSynopsisDialogComponent**: Full movie plot summaries

### Services
- **FetchApiDataService**: Complete API integration with localStorage fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Angular CLI (`npm install -g @angular/cli`)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CreativeMarkus/MyFlix-Angular.git
   cd MyFlix-Angular
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   ng serve
   # or
   npm start
   ```

4. **Open browser**: Navigate to `http://localhost:4200/`

### Production Build

```bash
ng build --configuration production
```

### Deploy to GitHub Pages

```bash
ng deploy --base-href=/MyFlix-Angular/
```

## 🔌 API Integration

The **FetchApiDataService** provides comprehensive backend connectivity:

### User Management
- **User Registration**: `userRegistration(userDetails)` - Create new user accounts
- **User Authentication**: `userLogin(userDetails)` - JWT-based login system
- **User Profile**: `getUser()`, `editUser()`, `deleteUser()` - Profile management
- **Token Management**: Automatic JWT storage and validation

### Movie Operations
- **All Movies**: `getAllMovies()` - Fetch complete movie catalog
- **Movie Details**: `getMovie(title)` - Get specific movie information
- **Director Info**: `getDirector(name)` - Director biographical data
- **Genre Info**: `getGenre(name)` - Genre descriptions and details

### Favorites System
- **Get Favorites**: `getFavouriteMovies()` - Retrieve user's favorite movies
- **Add Favorite**: `addFavouriteMovie(movieId)` - Add movie to favorites
- **Remove Favorite**: `deleteFavouriteMovie(movieId)` - Remove from favorites
- **Backup System**: Automatic localStorage fallback for offline functionality

## Project Structure

```
src/app/
├── app.component.ts              # Root component with dialog management
├── app.module.ts                 # NgModule with all imports and declarations
├── fetch-api-data.service.ts     # API service for backend communication
├── user-registration-form/       # Registration dialog component
└── user-login-form/              # Login dialog component
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build is optimized for performance and speed.

## Testing

To execute unit tests with the [Vitest](https://vitest.dev/) test runner:

```bash
ng test
```

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`):

```bash
ng generate --help
```

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
