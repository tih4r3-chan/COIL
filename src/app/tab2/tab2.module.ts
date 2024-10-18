import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,  // Asegúrate de que este módulo se importe
  ],
  declarations: [Tab2Page]  // Asegúrate de que Tab2Page esté declarado
})
export class Tab2PageModule {}
