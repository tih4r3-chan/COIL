import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  onLogin() {
    if (this.credentials.username && this.credentials.password) {
      // Aquí realizarás la solicitud al backend para autenticar al usuario
      this.http.post('http://database-1.clck8ocoinkm.us-east-2.rds.amazonaws.com/api/login', this.credentials)
        .subscribe(
          (response: any) => {
            console.log('Inicio de sesión exitoso', response);
            // Aquí puedes redirigir a la página de perfil o inicio
            // this.navCtrl.navigateForward('/perfil');
            alert('Inicio de sesión exitoso');
          },
          error => {
            console.error('Error al iniciar sesión', error);
            alert('Nombre de usuario o contraseña incorrectos.');
          }
        );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
