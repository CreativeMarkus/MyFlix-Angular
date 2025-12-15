# myFlix Angular Client

A modern Angular 21 client application for the myFlix movie database. Built with standalone components, Angular Material, and connected to a live Heroku API.

## Features

✅ **Welcome Screen**: Professional landing page with myFlix branding  
✅ **Movie Cards**: Browse movies with Material Design cards  
✅ **API Integration**: Connected to live Heroku backend  
✅ **Routing**: Navigation between welcome and movies pages  
✅ **Material Design**: Azure/Blue theme with responsive layout  
✅ **Custom Logo**: Movie clapperboard branding throughout  

## Technology Stack

- **Angular 21**: Latest framework with standalone components and new control flow
- **Angular Material**: Professional UI components with Azure theme
- **TypeScript**: Full type safety and modern JavaScript features
- **RxJS**: Reactive programming for API calls
- **SCSS**: Advanced styling with Material Design integration
- **Heroku API**: Live backend at `https://movieapi1-40cbbcb4b0ea.herokuapp.com/`

## Components

- **WelcomeComponent**: Landing page with logo and action buttons
- **MovieCardComponent**: Displays movie catalog from API
- **FetchApiDataService**: Complete API service with all endpoints
- **Routing**: Clean navigation between views

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   ng serve
   ```

3. **Open browser**: Navigate to `http://localhost:4200/`

## API Endpoints

The FetchApiDataService includes:
- User registration and authentication
- Movie catalog retrieval
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
