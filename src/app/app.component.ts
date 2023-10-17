import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imagePath = 'assets/auto.jpg';

  getSelectedType(type: string): void {
    this.imagePath = `assets/${type.toLowerCase()}.jpg`;
  }
}
