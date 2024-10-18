/* tab2.page.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page {
  userName = 'Juan Carlos';  // Este será dinámico después con los datos del usuario
  dailyTip = 'Come más frutas. Son ricas en fibra y te ayudarán a mantenerte saludable.';

  constructor() {}
}
