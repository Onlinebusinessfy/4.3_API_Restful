import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(localStorage.getItem('sesion') === 'true');

  login(usuario: string, password: string): boolean {

    const ok = usuario === 'admin' && password === '1234';

    if (ok) {
      localStorage.setItem('sesion', 'true');
      this.isLoggedIn.set(true);
    }

    return ok;
  }

  logout() {
    localStorage.removeItem('sesion');
    this.isLoggedIn.set(false);
  }
}