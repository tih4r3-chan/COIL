import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  userName: string = 'Nombre de usuario';
  dailyTip: string = 'Consejo diario de salud';

  constructor() { }

  ngOnInit() {
    // Inicializamos los valores
    this.userName = "Juan Carlos";  // Puedes cambiar este valor según corresponda
    this.dailyTip = "Come más frutas. Son ricas en fibra y te ayudarán a mantenerte saludable por más tiempo."; // Ejemplo de consejo diario
  }

}
