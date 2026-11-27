import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import {
  Personaje,
  RespuestaApi
} from '../models/personaje.interface';

// Interfaz para definir la respuesta que devuelve JSONPlaceholder
export interface PostRespuesta {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  // URL de la API de Rick and Morty
  private url = 'https://rickandmortyapi.com/api/character';

  // Obtener todos los personajes de una página
  getAll(pagina = 1): Observable<RespuestaApi> {
    return this.http.get<RespuestaApi>(`${this.url}?page=${pagina}`).pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error('No se pudo obtener la información'));
      })
    );
  }

  // Buscar personajes por nombre y página
  getByName(nombre: string, pagina = 1): Observable<RespuestaApi> {
    return this.http.get<RespuestaApi>(
      `${this.url}?name=${encodeURIComponent(nombre)}&page=${pagina}`
    );
  }

  // Obtener un personaje por su ID
  getById(id: number) {
    return this.http.get<Personaje>(
      `https://rickandmortyapi.com/api/character/${id}`
    );
  }

  // Enviar una publicación de prueba mediante POST
  crearPost(datos: {
    title: string;
    body: string;
    userId: number;
  }): Observable<PostRespuesta> {

    return this.http.post<PostRespuesta>(
      'https://jsonplaceholder.typicode.com/posts',
      datos
    );
  }
}
