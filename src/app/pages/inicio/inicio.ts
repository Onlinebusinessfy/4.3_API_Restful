import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="inicio">
      <h1>Bienvenido a Rick and Morty</h1>

      <p>
        Explora los personajes de la serie,
        consulta sus detalles y descubre más información.
      </p>

      <a routerLink="/catalogo">
        Ver catálogo
      </a>
    </section>
  `
})
export class Inicio {}