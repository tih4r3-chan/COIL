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
      await this.platform.ready();
      await this.onboardingService.init();
      
      // Agregamos await aquí
      const hasSeenOnboarding = await this.onboardingService.hasSeenOnboarding();
      
      if (hasSeenOnboarding) {
        await this.router.navigateByUrl('/login');
      } else {
        await this.router.navigateByUrl('/onboarding');
      }
    } catch (error) {
      console.error('Error durante la inicialización:', error);
    }
  }
}