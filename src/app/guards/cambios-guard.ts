import { CanDeactivateFn } from '@angular/router';
import { Admin } from '../pages/admin/admin';

export const cambiosGuard: CanDeactivateFn<Admin> = (comp) => {

  return comp.hayCambios
    ? confirm('¿Deseas salir sin guardar?')
    : true;

};