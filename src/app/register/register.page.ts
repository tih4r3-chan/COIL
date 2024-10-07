import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: any = {  // Definir 'user' para almacenar los datos del formulario
    username: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:5000/register', this.user).subscribe(response => {
      console.log('User registered successfully');
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration failed', error);
    });
  }
}