import { Injectable, inject } from '@angular/core';
import { AuthApiService } from './api/auth-api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User, RegisterUserReq } from '../models/user.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiService = inject(AuthApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // variable for storing user data
  currentUser$ = new BehaviorSubject<User>(this.getUserFromLocalStorage());

  // Register user
  registerUser(reqBody: RegisterUserReq) {
    this.authApiService.registerUser(reqBody).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showError(error.error.message);
      },
    });
  }
  // Login user

  loginUser(email: string, password: string) {
    this.authApiService.loginUser(email, password).subscribe({
      next: (res) => {
        const token = res.headers.get('access-token');
        const refreshToken = res.headers.get('refresh-token');

        const user = res.body as User;

        user.token = token;
        user.refreshToken = refreshToken;

        this.saveUserInLocalStorage(user);
        this.currentUser$.next(user);
        this.router.navigate(['event-posts']);
        this.notificationService.showSuccess('Successfully logged in!');
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showError(error.error.message);
      },
    });
  }

  refreshAccessToken() {
    const refreshToken = this.currentUser$.value?.refreshToken;

    return this.authApiService.refreshAccessToken(refreshToken).pipe(
      map((res) => {
        const token = res.headers.get('access-token');
        const refreshToken = res.headers.get('refresh-token');

        return { token, refreshToken };
      }),
      tap((value) => {
        const user = this.currentUser$.value;

        const { token, refreshToken } = value;

        if (user) {
          const updatedUser: User = {
            ...user,
            token,
            refreshToken,
          };
          this.saveUserInLocalStorage(updatedUser);
          this.currentUser$.next(updatedUser);
        }
      })
    );
  }

  logoutUser() {
    const refreshToken = this.currentUser$.value?.refreshToken;

    this.authApiService.logoutUserFromServer(refreshToken).subscribe({
      next: () => {
        this.notificationService.showSuccess('Successfully logged out!');
        this.logoutUserFromClient();
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
        this.logoutUserFromClient();
      },
    });
  }

  logoutAll() {
    this.authApiService.logoutAllFromServer().subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Successfully logged out from all devices!'
        );
        this.logoutUserFromClient();
      },
      error: (error) => {
        this.notificationService.showError(error.error.message);
        this.logoutUserFromClient();
      },
    });
  }

  saveUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const stringUserData = localStorage.getItem('currentUser');

    return stringUserData ? JSON.parse(stringUserData) : null;
  }

  logoutUserFromClient() {
    this.currentUser$.next(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
