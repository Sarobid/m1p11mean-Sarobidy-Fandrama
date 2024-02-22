import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-head-page-libre',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './head-page-libre.component.html',
  styleUrl: './head-page-libre.component.css'
})
export class HeadPageLibreComponent{
  nameApp="MEAN Beauty";
  constructor(){
  }
}
