import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ErrorService } from '../../service/service-ts/Error-service';
import { ErreurComponent } from '../erreur/erreur.component';
import { TitleAppComponent } from '../title-app/title-app.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgIf,ErreurComponent,TitleAppComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent{
  constructor(public errorService: ErrorService) {}
}
