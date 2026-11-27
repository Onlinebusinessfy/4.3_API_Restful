import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <section class="admin">

      <h1>Panel de administración</h1>

      <p>Bienvenido al panel administrativo.</p>

      <h3>Formulario de administración</h3>

      <label>Escribe algún cambio:</label>

      <textarea
        (input)="hayCambios = true"
        placeholder="Escribe aquí..."
      ></textarea>

      <p>
        Puedes intentar salir para comprobar
        el funcionamiento del guard.
      </p>

    </section>
  `
})
export class Admin {

  hayCambios = false;

}