/* user.service.ts */

import { Injectable } from '@angular/core';

interface User {
  fullName: string;
  username: string;
  weight: number | null;
  height: number | null;
  age: number | null;
  gender: string;
  goal: string;
  physicalActivityLevel: number | null;
  healthConditions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string | null = null;
  private currentUser: User | null = null;

  constructor() {
    // Intentar recuperar el token y el usuario del localStorage al iniciar el servicio
    this.token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  setUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    return this.currentUser;
  }

  clearUserData() {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  updateUserProfile(userData: Partial<User>) {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
  }

  // Método para actualizar datos específicos del usuario
  updateUserMetrics(weight: number, height: number) {
    if (this.currentUser) {
      this.currentUser.weight = weight;
      this.currentUser.height = height;
      localStorage.setItem('user', JSON.stringify(this.currentUser));
    }
  }

  // Método para obtener el IMC del usuario
  calculateBMI(): number | null {
    if (this.currentUser?.weight && this.currentUser?.height) {
      const heightInMeters = this.currentUser.height / 100;
      return this.currentUser.weight / (heightInMeters * heightInMeters);
    }
    return null;
  }
}