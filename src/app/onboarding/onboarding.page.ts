import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  constructor(private router: Router) {}

  finishOnboarding() {
    // Aquí defines la navegación o lógica final del onboarding
    this.router.navigate(['/home']);  // Ejemplo de navegación a la página principal
  }
}
