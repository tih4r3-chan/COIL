import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { LoadingController, AlertController } from '@ionic/angular';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  async onLogin() {
    if (!this.credentials.username || !this.credentials.password) {
      await this.showAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const response: any = await this.http.post('http://localhost:5000/login', this.credentials).toPromise();
      this.userService.setToken(response.token);
      await loading.dismiss();
      this.router.navigate(['/home']);
    } catch (error) {
      await loading.dismiss();
      await this.showAlert('Error', 'Usuario o contraseña incorrectos');
      console.error('Error al iniciar sesión:', error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}