import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="no-encontrado">

      <h1>404</h1>

      <h2>Página no encontrada</h2>

      <p>La dirección que buscas no existe.</p>

      <a routerLink="/inicio">
        Volver al inicio
      </a>

    </section>
  `
})
export class NoEncontrado {}