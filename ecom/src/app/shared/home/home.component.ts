import { Component } from '@angular/core';
import { CardComponent } from '../../open/card/card.component';


@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
}
