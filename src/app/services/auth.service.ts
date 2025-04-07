import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private oidcSecurityService: OidcSecurityService) { }

    userData: any = {};

    initAuth() {
        this.oidcSecurityService.checkAuth().subscribe({
            next: ({ isAuthenticated, userData, accessToken }) => {
                console.log('Authenticated:', isAuthenticated);
                console.log('User Data:', userData);
                console.log('Access Token:', accessToken);
                this.userData = userData;
            },
            error: (err) => console.error('Authentication check failed:', err)
        });
    }

    login() {
        this.oidcSecurityService.checkAuth().subscribe({
            next: ({ isAuthenticated }) => {
                if (!isAuthenticated) {
                    this.oidcSecurityService.authorize();
                } else {
                    console.log('Already authenticated');
                }
            },
            error: (err) => console.error('Authentication check failed:', err)
        });
    }

    logout() {
        this.oidcSecurityService.logoff().subscribe();
    }
}