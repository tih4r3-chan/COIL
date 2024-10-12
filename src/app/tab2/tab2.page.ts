import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage {
  activity = {
    user_id: '',
    activity_type: '',
    description: '',
    date: ''
  };

  constructor(private http: HttpClient) {}

  addActivity() {
    this.http.post('/activities', this.activity).subscribe(response => {
      console.log('Actividad agregada', response);
      // Reset form or show success message
    });
  }
}
