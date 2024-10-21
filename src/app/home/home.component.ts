/* home.component.ts */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  question = '';
  answer = '';


  constructor(private http: HttpClient) { }

  askQuestion() {
    this.http.post<any>('http://EC2_IP:5000/ask', { question: this.question })
      .subscribe(response => {
        this.answer = response.answer;
      });
  }
}