# myFlix Angular Client

An Angular 21 client application for the myFlix movie database, built following CareerFoundry Lesson 6.3 requirements. Features user registration and login with Angular Material dialogs and traditional NgModule architecture.

## Features

✅ **Welcome Screen**: Professional landing page with myFlix logo and branding  
✅ **User Registration**: Modal dialog form with validation and API integration  
✅ **User Login**: Authentication with token and user data storage  
✅ **Angular Material**: Complete UI component integration with dialogs and forms  
✅ **API Integration**: Connected to live Heroku backend with HttpClient  
✅ **NgModule Architecture**: Traditional Angular module structure (lesson compliant)  
✅ **Local Storage**: Secure token and user data persistence  

## Technology Stack

- **Angular 21**: Latest framework with NgModule-based architecture
- **Angular Material**: Professional UI components and dialog system
- **TypeScript**: Full type safety and modern JavaScript features
- **RxJS**: Reactive programming for HTTP API calls
- **FormsModule**: Two-way data binding with [(ngModel)]
- **SCSS**: Custom styling with Material Design theming
- **Heroku API**: Live backend at `https://movieapi1-40cbbcb4b0ea.herokuapp.com/`

## Components

- **AppComponent**: Root component with dialog launchers and welcome interface
- **UserRegistrationFormComponent**: Registration form with Material Design
- **UserLoginFormComponent**: Authentication form with local storage integration
- **FetchApiDataService**: Complete API service with registration and login endpoints

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

## API Integration

The FetchApiDataService provides:
- **User Registration**: `userRegistration(userDetails)` - Create new user accounts
- **User Authentication**: `userLogin(userDetails)` - Login with credentials
- **Token Management**: Automatic storage of JWT tokens in localStorage
- **Movie Endpoints**: Ready for future movie catalog integration
- **Error Handling**: Complete error management with user feedback

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
