import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user!: User;
    
    constructor(private oidcSecurityService: OidcSecurityService) { }

    initAuth() {
        this.oidcSecurityService.checkAuth().subscribe({
            next: ({ isAuthenticated, userData, accessToken }) => {
                if (isAuthenticated) {
                    this.user = new User({
                        sub: userData.sub,
                        email_verified: userData.email_verified,
                        name: userData.name,
                        preferred_username: userData.preferred_username,
                        given_name: userData.given_name,
                        family_name: userData.family_name,
                        email: userData.email,
                        accessToken: accessToken
                    });
                }
            },
            error: (err) => console.error('Authentication check failed:', err)
        });
    }

    isAuthenticated(): boolean {
        let authenticated = false;
        this.oidcSecurityService.isAuthenticated().subscribe({
            next: (isAuthenticated) => {
                authenticated = isAuthenticated;
            },
            error: (err) => console.error('Authentication check failed:', err)
        });
        return authenticated;
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

    getAccessToken(): string {
        return this.user?.accessToken || '';
    }
}