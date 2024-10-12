/* register.page.ts */

import { UserService } from '../services/user.service';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user = {
    fullName: '',
    username: '',
    password: '',  // Asegúrate de incluir este campo
    weight: null,
    height: null,
    age: null,
    gender: '',
    goal: '',
    physicalActivityLevel: null,
    healthConditions: []
  };

  constructor(private navCtrl: NavController, private http: HttpClient, private userService: UserService) {}

  // Función para manejar el envío del formulario de registro
  onRegister() {
    if (this.user.fullName && this.user.username && this.user.password && // Agrega la verificación de contraseña
        this.user.weight !== null && this.user.height !== null &&
        this.user.age !== null && this.user.gender && 
        this.user.goal && this.user.physicalActivityLevel !== null) {
      
      console.log('Datos de usuario:', this.user);

      // Enviar los datos al backend
      this.http.post('http://localhost:5000/register', this.user).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
          alert('Registro exitoso');
          this.navCtrl.navigateForward('/home'); // Redirigir a la página de inicio
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          alert('Error al registrar usuario: ' + error.error.message || error.message); // Muestra el mensaje de error
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
