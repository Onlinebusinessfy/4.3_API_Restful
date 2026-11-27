
import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { Personaje } from '../../models/personaje.interface';
import { Tarjeta } from '../tarjeta/tarjeta';

@Component({
  selector: 'app-lista',
  imports: [Tarjeta],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {

  private apiService = inject(ApiService);

  personajes = signal<Personaje[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.apiService.getAll().subscribe({
      next: (respuesta) => {
        this.personajes.set(respuesta.results);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.cargando.set(false);
      }
    });
  }
}
