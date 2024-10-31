import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

interface User {
  fullName: string;
  username: string;
  password: string;
  weight: number | null;
  height: number | null;
  age: number | null;
  gender: string;
  goal: string;
  physicalActivityLevel: number | null;
  healthConditions: string[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  user: User = {
    fullName: '',
    username: '',
    password: '',
    weight: null,
    height: null,
    age: null,
    gender: '',
    goal: '',
    physicalActivityLevel: null,
    healthConditions: []
  };

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async onRegister() {
    if (this.validateForm()) {
      try {
        console.log('Datos de usuario:', this.user);
        const response = await this.authService.register(this.user).toPromise();
        console.log('Registro exitoso:', response);

        // Guardar el token si viene en la respuesta
        if (response && response.token) {
          this.userService.setToken(response.token);
        }

        // Guardar los datos del usuario
        this.userService.setUser({
          fullName: this.user.fullName,
          username: this.user.username,
          weight: this.user.weight,
          height: this.user.height,
          age: this.user.age,
          gender: this.user.gender,
          goal: this.user.goal,
          physicalActivityLevel: this.user.physicalActivityLevel,
          healthConditions: this.user.healthConditions
        });

        alert('Registro exitoso');
        this.navCtrl.navigateForward('/login');
      } catch (error: any) {
        console.error('Error al registrar usuario:', error);
        const errorMessage = error.error?.message || error.message || 'Error desconocido';
        alert('Error al registrar usuario: ' + errorMessage);
      }
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }

  validateForm(): boolean {
    return !!(
      this.user.fullName &&
      this.user.username &&
      this.user.password &&
      this.user.weight !== null &&
      this.user.height !== null &&
      this.user.age !== null &&
      this.user.gender &&
      this.user.goal &&
      this.user.physicalActivityLevel !== null
    );
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Métodos auxiliares para la validación de campos individuales
  isFieldValid(field: keyof User): boolean {
    if (field === 'weight' || field === 'height' || field === 'age' || field === 'physicalActivityLevel') {
      return this.user[field] !== null;
    }
    return !!this.user[field];
  }

  // Método para manejar cambios en campos numéricos
  onNumberInput(event: any, field: 'weight' | 'height' | 'age' | 'physicalActivityLevel') {
    const value = event.target.value;
    this.user[field] = value ? parseFloat(value) : null;
  }

  // Método para manejar cambios en las condiciones de salud
  onHealthConditionChange(condition: string) {
    const index = this.user.healthConditions.indexOf(condition);
    if (index === -1) {
      this.user.healthConditions.push(condition);
    } else {
      this.user.healthConditions.splice(index, 1);
    }
  }

  // Método para reiniciar el formulario
  resetForm() {
    this.user = {
      fullName: '',
      username: '',
      password: '',
      weight: null,
      height: null,
      age: null,
      gender: '',
      goal: '',
      physicalActivityLevel: null,
      healthConditions: []
    };
  }
}