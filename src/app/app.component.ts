// src/app/app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { OnboardingService } from './services/onboarding.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private onboardingService: OnboardingService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      console.log('Iniciando la aplicación...');
      await this.platform.ready();
      console.log('Plataforma lista');
      await this.onboardingService.init();
      console.log('Servicio de onboarding inicializado');

      // Descomenta la siguiente línea para resetear el onboarding (solo para pruebas)
      await this.onboardingService.resetOnboarding();
      
      const hasSeenOnboarding = await this.onboardingService.hasSeenOnboarding();
      console.log('¿Ha visto el onboarding?', hasSeenOnboarding);
      
      if (hasSeenOnboarding) {
        console.log('Navegando a login');
        await this.router.navigateByUrl('/login');
      } else {
        console.log('Navegando a onboarding');
        await this.router.navigateByUrl('/onboarding');
      }
    } catch (error) {
      console.error('Error durante la inicialización:', error);
    }
  }
}