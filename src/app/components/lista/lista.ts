
import { Component, OnInit, signal, inject } from '@angular/core';
import { ApiService, PostRespuesta } from '../../services/api';
import { Personaje, RespuestaApi } from '../../models/personaje.interface';
import { Tarjeta } from '../tarjeta/tarjeta';

@Component({
  selector: 'app-lista',
  imports: [Tarjeta],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {

  private apiService = inject(ApiService);

  // Signals para controlar los personajes
  personajes = signal<Personaje[]>([]);
  cargando = signal(true);
  error = signal('');

  // Signals para la paginación
  pagina = signal(1);
  info = signal<RespuestaApi['info'] | null>(null);

  // Signal para el buscador
  nombreBusqueda = signal('');

  // Signals para el formulario POST
  tituloPost = signal('');
  contenidoPost = signal('');
  respuestaPost = signal<PostRespuesta | null>(null);

  ngOnInit(): void {
    this.cargarPersonajes(1);
  }

  // Consultar personajes de una página
  cargarPersonajes(pagina: number): void {
    this.cargando.set(true);
    this.error.set('');

    this.apiService.getAll(pagina).subscribe({
      next: (respuesta) => {
        this.personajes.set(respuesta.results);
        this.info.set(respuesta.info);
        this.pagina.set(pagina);
        this.cargando.set(false);
      },
      error: (err) => {
        this.personajes.set([]);
        this.info.set(null);
        this.error.set(err.message);
        this.cargando.set(false);
      }
    });
  }

  // Cambiar de página utilizando info.next e info.prev
  cambiarPagina(direccion: 'next' | 'prev'): void {
    const url = this.info()?.[direccion];

    if (!url) {
      return;
    }

    const nuevaPagina = Number(new URL(url).searchParams.get('page'));

    if (!nuevaPagina) {
      return;
    }

    // Si existe una búsqueda, conservarla al cambiar de página
    const nombre = this.nombreBusqueda().trim();

    if (nombre) {
      this.cargando.set(true);
      this.error.set('');

      this.apiService.getByName(nombre, nuevaPagina).subscribe({
        next: (respuesta) => {
          this.personajes.set(respuesta.results);
          this.info.set(respuesta.info);
          this.pagina.set(nuevaPagina);
          this.cargando.set(false);
        },
        error: () => {
          this.personajes.set([]);
          this.error.set('No se encontraron personajes.');
          this.cargando.set(false);
        }
      });
    } else {
      this.cargarPersonajes(nuevaPagina);
    }
  }

  // Guardar el texto escrito en el buscador
  actualizarBusqueda(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nombreBusqueda.set(input.value);
  }

  // Buscar personajes por nombre
  buscarPersonaje(): void {
    const nombre = this.nombreBusqueda().trim();

    if (!nombre) {
      this.cargarPersonajes(1);
      return;
    }

    this.cargando.set(true);
    this.error.set('');

    this.apiService.getByName(nombre).subscribe({
      next: (respuesta) => {
        this.personajes.set(respuesta.results);
        this.info.set(respuesta.info);
        this.pagina.set(1);
        this.cargando.set(false);
      },
      error: () => {
        this.personajes.set([]);
        this.info.set(null);
        this.error.set('No se encontraron personajes con ese nombre.');
        this.cargando.set(false);
      }
    });
  }

  // Limpiar el buscador y mostrar todos los personajes
  limpiarBusqueda(): void {
    this.nombreBusqueda.set('');
    this.cargarPersonajes(1);
  }

  // Actualizar el título del formulario
  actualizarTitulo(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tituloPost.set(input.value);
  }

  // Actualizar el contenido del formulario
  actualizarContenido(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.contenidoPost.set(input.value);
  }

  // Enviar información mediante POST
  enviarPost(): void {
    if (!this.tituloPost().trim() || !this.contenidoPost().trim()) {
      return;
    }

    this.respuestaPost.set(null);

    this.apiService.crearPost({
      title: this.tituloPost(),
      body: this.contenidoPost(),
      userId: 1
    }).subscribe({
      next: (respuesta) => {
        this.respuestaPost.set(respuesta);
        this.tituloPost.set('');
        this.contenidoPost.set('');
      },
      error: (err) => {
        console.error('Error al enviar el formulario:', err);
      }
    });
  }
}
