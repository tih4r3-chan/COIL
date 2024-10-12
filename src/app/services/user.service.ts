// src/app/services/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string | null = null;

  constructor() { }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token); // Almacenar en localStorage si es necesario
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  // Puedes agregar más métodos relacionados con el usuario aquí
}
