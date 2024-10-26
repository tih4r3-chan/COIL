import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  userInput: string = '';
  messages: any[] = []; // Array para almacenar los mensajes del chatbot

  constructor() {}

  async sendMessage() {
    if (this.userInput.trim()) {
      const userMessage = { role: 'user', content: this.userInput };
      this.messages.push(userMessage); // Agregar mensaje del usuario
      const response = await this.getChatbotResponse(this.messages);
      this.messages.push({ role: 'assistant', content: response }); // Agregar respuesta del chatbot
      this.userInput = ''; // Limpiar el campo de entrada
    }
  }

  async getChatbotResponse(messages: any[]) {
    const apiKey = ''; // Reemplaza con tu clave de API
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await axios.post(apiUrl, {
        model: 'gpt-3.5-turbo',
        messages: messages,
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error al obtener respuesta del chatbot:', error);
      return 'Lo siento, ocurrió un error.';
    }
  }
}
