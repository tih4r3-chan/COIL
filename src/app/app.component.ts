// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private storage: Storage) {
    this.initializeApp();
  }

  async initializeApp() {
    // Inicializa el almacenamiento
    await this.storage.create(); // Llama a create() aquí
    // Lógica para redirigir al onboarding si es la primera vez
    const onboardingComplete = await this.storage.get('onboardingComplete');
    if (!onboardingComplete) {
      this.router.navigateByUrl('/onboarding');
    }
  }
}
