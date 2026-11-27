import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="login">

      <h1>Iniciar sesión</h1>

      <form (ngSubmit)="iniciarSesion()">

        <label>Usuario</label>

        <input
          type="text"
          [(ngModel)]="usuario"
          name="usuario"
          required
        >

        <label>Contraseña</label>

        <input
          type="password"
          [(ngModel)]="password"
          name="password"
          required
        >

        <button type="submit">
          Entrar
        </button>

      </form>

      @if (error) {
        <p>Usuario o contraseña incorrectos.</p>
      }

    </section>
  `
})
export class Login {

  usuario = '';
  password = '';
  error = false;

  private auth = inject(AuthService);
  private router = inject(Router);

  iniciarSesion() {

    const correcto = this.auth.login(
      this.usuario,
      this.password
    );

    if (correcto) {
      this.router.navigate(['/admin']);
    } else {
      this.error = true;
    }

  }

}