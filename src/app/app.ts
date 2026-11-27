import { Component } from '@angular/core';
import { Lista } from './components/lista/lista';

@Component({
  selector: 'app-root',
  imports: [Lista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

}
