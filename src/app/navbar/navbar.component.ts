/**
 * Navigation bar component providing user authentication status and navigation options.
 * Displays different options based on user login state and provides navigation
 * to different sections of the application. Automatically updates when user
 * authentication state changes or when navigating between routes.
 */
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',         // Component CSS selector
    standalone: false,              // Part of NgModule
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    /** Current user object from localStorage */
    user: any = null;

    /** Subscription to router events for navigation detection */
    private routerSubscription!: Subscription;

    /**
     * Constructor injects required services
     * @param router - Angular router service for navigation
     * @param cdr - Change detector for manual change detection
     */
    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    /**
     * Angular OnInit lifecycle hook
     * Initializes user state and sets up router event subscription
     */
    ngOnInit(): void {
        this.loadUser();

        // Listen to router events to detect navigation and refresh user state
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.loadUser();
                this.cdr.detectChanges();
            });
    }

    /**
     * Angular OnDestroy lifecycle hook
     * Cleans up subscriptions to prevent memory leaks
     */
    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    /**
     * Loads user data from localStorage and updates component state
     */
    loadUser(): void {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userData && token) {
            this.user = JSON.parse(userData);
        } else {
            this.user = null;
        }
    }

    /**
     * Checks if user is currently logged in
     * @returns True if user is logged in with valid token, false otherwise
     */
    isLoggedIn(): boolean {
        return this.user !== null && localStorage.getItem('token') !== null;
    }

    /**
     * Logs out the current user and redirects to welcome page
     * Clears all authentication data from localStorage
     */
    logout(): void {
        localStorage.clear();
        this.user = null;
        this.cdr.detectChanges();
        this.router.navigate(['welcome']);
    }

    /**
     * Navigates to the user profile page
     */
    goToProfile(): void {
        this.router.navigate(['profile']);
    }

    /**
     * Navigates to the movies browsing page
     */
    goToMovies(): void {
        this.router.navigate(['movies']);
    }
}