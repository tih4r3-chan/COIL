import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';  // Asegúrate de importar Swiper

import { OnboardingPage } from './onboarding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: OnboardingPage }]),
    SwiperModule, // Aquí añadimos Swiper
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
