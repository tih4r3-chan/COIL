import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  
  login() {
    this.http.post('http://localhost:5000/login', this.credentials).subscribe(response => {
      console.log('Login successful');
      // Guardar datos del usuario o token si es necesario
      this.router.navigate(['/tabs']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
