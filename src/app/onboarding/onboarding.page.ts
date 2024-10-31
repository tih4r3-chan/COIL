// src/app/onboarding/onboarding.page.ts
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
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
    private storage: Storage,
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
      await this.onboardingService.setOnboardingComplete();
      await this.router.navigate(['/register']);
    } catch (error) {
      console.error('Error al finalizar el onboarding:', error);
    }
  }
}