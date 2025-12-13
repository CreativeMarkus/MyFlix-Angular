# myFlix Angular Client

A modern Angular client application for the myFlix movie database API. This project provides a user-friendly interface for browsing movies, managing user accounts, and maintaining favorite movie lists.

## About

This Angular application serves as the frontend client for the myFlix API, built as part of the Career Foundry Full-Stack Web Development program. Users can:

- Browse and search through a comprehensive movie database
- View detailed information about movies, directors, and genres
- Create and manage user accounts
- Maintain personalized favorite movie lists
- Secure authentication and user session management

## Features

- **Movie Browsing**: View all available movies with detailed information
- **User Management**: Registration, login, profile editing, and account deletion
- **Favorites System**: Add and remove movies from personal favorites list
- **Detailed Views**: In-depth information about movies, directors, and genres
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Secure Authentication**: JWT token-based authentication system

## Technology Stack

- **Angular 21**: Modern web framework with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming with Observables
- **HttpClient**: HTTP communication with the API
- **Angular CLI**: Development tooling and build system

## API Integration

The application integrates with the myFlix REST API providing the following endpoints:

- User registration and authentication
- Movie catalog management
- User profile management
- Favorite movies functionality
- Director and genre information

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
