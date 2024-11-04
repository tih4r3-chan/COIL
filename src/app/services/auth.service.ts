import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Agregado HttpHeaders
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interfaces para tipar los datos
export interface RegisterUser {
  fullName: string;
  username: string;
  password: string;
  weight: number;
  height: number;
  age: number;
  gender: string;
  goal: string;
  physicalActivityLevel: number;
  healthConditions: string[];
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(userData: RegisterUser): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData, { headers })
      .pipe(
        tap(response => console.log('Respuesta del servidor:', response))
      );
  }

  login(loginData: LoginUser): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData, { headers });
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  verifyToken(): Observable<AuthResponse> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AuthResponse>(`${this.apiUrl}/verify-token`, { headers });
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}