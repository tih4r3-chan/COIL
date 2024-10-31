import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { OnboardingService } from '../services/onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements AfterViewInit {
  constructor(
    private router: Router,
    private onboardingService: OnboardingService
  ) {}

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
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
    try {
      console.log('Finalizando onboarding...');
      await this.onboardingService.setOnboardingComplete();
      console.log('Onboarding completado, navegando a registro');
      await this.router.navigate(['/register']);
    } catch (error) {
      console.error('Error al finalizar el onboarding:', error);
    }
  }
}