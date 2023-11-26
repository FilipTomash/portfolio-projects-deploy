import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { authGuard, loginGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [() => loginGuard()],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./core/components/about/about.component').then(
        (c) => c.AboutComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    canActivate: [() => loginGuard()],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (c) => c.LoginComponent
      ),

    canActivate: [() => loginGuard()],
  },
  {
    path: 'event-posts',
    loadComponent: () =>
      import(
        './features/event-posts/event-post-list/event-post-list.component'
      ).then((c) => c.EventPostListComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'event-posts/add',
    loadComponent: () =>
      import(
        './features/event-posts/event-post-form/event-post-form.component'
      ).then((c) => c.EventPostFormComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'event-posts/edit',
    loadComponent: () =>
      import(
        './features/event-posts/event-post-form/event-post-form.component'
      ).then((c) => c.EventPostFormComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'event-posts/user',
    loadComponent: () =>
      import(
        './features/event-posts/event-post-list/event-post-list.component'
      ).then((c) => c.EventPostListComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'event-posts/user/comments',
    loadComponent: () =>
      import(
        './features/event-posts/user-comments/user-comments.component'
      ).then((c) => c.UserCommentsComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: 'event-posts/:id',
    loadComponent: () =>
      import(
        './features/event-posts/event-post-details/event-post-details.component'
      ).then((c) => c.EventPostDetailsComponent),
    canActivate: [() => authGuard()],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
