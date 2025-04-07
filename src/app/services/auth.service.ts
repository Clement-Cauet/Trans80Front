import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private oidcSecurityService: OidcSecurityService,
        private router: Router
    ) { }

    userData: any = {};

    initAuth() {
        this.oidcSecurityService.checkAuth().subscribe({
            next: ({ isAuthenticated, userData, accessToken }) => {
                console.log('Authenticated:', isAuthenticated);
                console.log('User Data:', userData);
                console.log('Access Token:', accessToken);
                if (!isAuthenticated) this.login();
                this.userData = userData;
            },
            error: (err) => console.error('Authentication check failed:', err)
        });
    }

    login() {
        this.oidcSecurityService.authorize();
    }

    logout() {
        this.oidcSecurityService.logoff().subscribe();
    }
}