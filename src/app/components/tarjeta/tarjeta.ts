import { Component, input } from '@angular/core';
import { Personaje } from '../../models/personaje.interface';

@Component({
  selector: 'app-tarjeta',
  imports: [],
  templateUrl: './tarjeta.html',
  styleUrl: './tarjeta.css'
})
export class Tarjeta {

  // Recibe obligatoriamente la información de un personaje
  personaje = input.required<Personaje>();

}
