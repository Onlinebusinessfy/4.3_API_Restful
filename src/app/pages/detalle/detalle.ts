import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';
import { Personaje } from '../../models/personaje.interface';

@Component({
  selector: 'app-detalle',
  standalone: true,
  template: `
    <section class="detalle">

      <button (click)="volver()">Volver</button>

      @if (personaje) {
        <h1>{{ personaje.name }}</h1>

        <img [src]="personaje.image" [alt]="personaje.name">

        <p><strong>ID:</strong> {{ personaje.id }}</p>
        <p><strong>Estado:</strong> {{ personaje.status }}</p>
        <p><strong>Especie:</strong> {{ personaje.species }}</p>
        <p><strong>Tipo:</strong> {{ personaje.type || 'Desconocido' }}</p>
        <p><strong>Género:</strong> {{ personaje.gender }}</p>
        <p><strong>Origen:</strong> {{ personaje.origin.name }}</p>
        <p><strong>Ubicación:</strong> {{ personaje.location.name }}</p>
      }

      @if (cargando) {
        <p>Cargando personaje...</p>
      }

      @if (error) {
        <h2>Personaje no encontrado</h2>
        <p>No existe un personaje con el ID {{ id() }}.</p>
      }

    </section>
  `
})
export class Detalle implements OnInit {

  id = input.required<string>();

  personaje?: Personaje;
  cargando = true;
  error = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {

    this.api.getById(+this.id()).subscribe({
      next: (data) => {
        this.personaje = data;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });

  }

  volver() {
    this.router.navigate(['/catalogo']);
  }

}