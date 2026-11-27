import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { Detalle } from './pages/detalle/detalle';
import { Login } from './pages/login/login';
import { NoEncontrado } from './pages/no-encontrado/no-encontrado';

import { Lista } from './components/lista/lista';

import { authGuard } from './guards/auth-guard';
import { cambiosGuard } from './guards/cambios-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    component: Inicio,
    title: 'Inicio'
  },

  {
    path: 'catalogo',
    component: Lista,
    title: 'Catálogo'
  },

  {
    path: 'catalogo/:id',
    component: Detalle,
    title: 'Detalle'
  },

  {
    path: 'login',
    component: Login,
    title: 'Iniciar sesión'
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin').then(m => m.Admin),
    canActivate: [authGuard],
    canDeactivate: [cambiosGuard],
    title: 'Administración'
  },

  {
    path: '**',
    component: NoEncontrado,
    title: 'Página no encontrada'
  }

];