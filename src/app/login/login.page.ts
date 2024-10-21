/* login.page.ts */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  onLogin() {
    if (this.credentials.username && this.credentials.password) {
      this.http.post('http://localhost:5000/login', this.credentials).subscribe(
        (response: any) => {
          this.userService.setToken(response.token);
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/home']); // Redirigir a la página de inicio
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión: ' + error.error.message || error.message);
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
