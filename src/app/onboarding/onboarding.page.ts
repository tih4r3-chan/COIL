// onboarding.page.ts
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'; // Asegúrate de importar Storage
import Swiper from 'swiper'; // Asegúrate de que Swiper esté instalado

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {
  constructor(private router: Router, private storage: Storage) {}

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      // Opciones de Swiper, puedes personalizar según tus necesidades
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      slidesPerView: 1,
      spaceBetween: 10,
    });
  }

  async finishOnboarding() {
    // Guarda que el onboarding ha sido completado usando notación de corchetes
    await this.storage['set']('onboardingComplete', true);
    // Navega a la página principal
    this.router.navigate(['/register']);
  }
}
