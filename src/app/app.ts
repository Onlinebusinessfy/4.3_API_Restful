import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router
} from '@angular/router';

import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  // Servicio de autenticación
  auth = inject(AuthService);

  // Servicio para navegar entre páginas
  router = inject(Router);

  // Cerrar sesión
  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/inicio']);
  }

}