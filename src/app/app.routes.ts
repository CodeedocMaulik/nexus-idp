import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Default route: Redirect empty path to /overview
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },

  // 2. Overview Dashboard (Lazy Loaded Standalone Component)
  {
    path: 'overview',
    loadComponent: () => import('./features/overview/overview').then((m) => m.Overview),
  },

  // 3. Fallback: Any unknown route redirects back to overview
  {
    path: '**',
    redirectTo: 'overview',
  },
];
