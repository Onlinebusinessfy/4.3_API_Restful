import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService } from '../../services/api';
import { Personaje } from '../../models/personaje.interface';

@Component({
  selector: 'app-lista',
  imports: [],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {

  private apiService = inject(ApiService);

  // Signals para controlar los personajes, la carga y los errores
  personajes = signal<Personaje[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
    // Consultar los personajes al iniciar el componente
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
