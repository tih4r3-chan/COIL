import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  ejercicios = [
    {
      name: 'Trotar',
      duration: '30 min',
      calories: '300 cal.',
      image: 'assets/images/cardio.jpg', 
    },
    {
      name: 'Andar en Bicicleta',
      duration: '60 min',
      calories: '550 cal.',
      image: 'assets/images/fuerza.jpg',
    }
  ];

  constructor() { }
  ngOnInit() {
  }

}
