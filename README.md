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

## 📁 Project Structure

```
src/
├── app/
│   ├── app.component.*                    # Root application component
│   ├── app.module.ts                      # Main NgModule configuration
│   ├── fetch-api-data.service.ts          # API service with localStorage fallbacks
│   ├── movie-card/                        # Movie display cards
│   ├── movie-details-dialog/              # Movie information modal
│   ├── movie-director-dialog/             # Director biography modal  
│   ├── movie-genre-dialog/                # Genre information modal
│   ├── movie-synopsis-dialog/             # Movie synopsis modal
│   ├── movies/                            # Movie catalog component
│   ├── navbar/                            # Navigation component
│   ├── user-login-form/                   # Login form component
│   ├── user-profile/                      # User profile management
│   ├── user-registration-form/            # Registration form component
│   └── welcome-page/                      # Landing page component
├── assets/                                # Static assets
├── styles.scss                            # Global styles
└── index.html                             # Application entry point
```

## 🧪 Development & Testing

### Development Server
```bash
ng serve
# Application available at http://localhost:4200/
```

### Production Build
```bash
ng build --configuration production
# Output: dist/my-flix-angular-client/
```

### Testing
```bash
ng test          # Unit tests with Vitest
ng e2e           # End-to-end testing (framework of choice)
```

### Code Generation
```bash
ng generate component component-name    # Generate new component
ng generate service service-name        # Generate new service
ng generate --help                      # View all available schematics
```

## 🚀 Deployment

This application is automatically deployed to GitHub Pages using `angular-cli-ghpages`.

### Live Application
- **URL**: https://creativemarkus.github.io/MyFlix-Angular/
- **Branch**: `gh-pages` (auto-generated)
- **Build**: Production optimized

### Deployment Process
```bash
ng deploy --base-href=/MyFlix-Angular/
```

This command:
1. Builds the application for production
2. Creates necessary GitHub Pages files (404.html, .nojekyll)
3. Commits build artifacts to `gh-pages` branch
4. Pushes to GitHub for automatic deployment

## 📚 Additional Resources

- **[Angular CLI Documentation](https://angular.dev/tools/cli)** - Complete CLI reference
- **[Angular Material](https://material.angular.io/)** - UI component library
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[myFlix API Documentation](https://movieapi1-40cbbcb4b0ea.herokuapp.com/)** - Backend API reference

## 👨‍💻 Developer

**Markus** - [GitHub Profile](https://github.com/CreativeMarkus)

## 📄 License

This project is part of the CareerFoundry Full-Stack Web Development Program.
