import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  messages: any[] = [];
  userInput: string = '';

  constructor(private http: HttpClient) {}

  async sendMessage() {
    if (this.userInput.trim()) {
      // Agregar el mensaje del usuario
      this.messages.push({
        role: 'user',
        content: this.userInput
      });

      try {
        // Hacer la petición al backend
        const response = await this.http.post('http://localhost:5000/ask', {
          question: this.userInput
        }).toPromise();

        // Agregar la respuesta del asistente
        if (response) {
          this.messages.push({
            role: 'assistant',
            content: response
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }

      // Limpiar el input
      this.userInput = '';
    }
  }
}