import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Personaje, RespuestaApi } from '../models/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
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

  // Obtener un personaje por su ID
  getById(id: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.url}/${id}`);
  }
}
