import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {
  ejercicios = [
    { name: 'Trotar', duration: '30 Minutos', calories: '200 Cal', image: 'ruta_imagen_trotar' },
    { name: 'Andar en Bicicleta', duration: '1 Hora', calories: '550 Cal', image: 'ruta_imagen_bicicleta' },
  ];
}
