import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NgModule } from '@angular/core';
import { Tab1Page } from './tab1.page';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}