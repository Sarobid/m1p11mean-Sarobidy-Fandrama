import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ErrorService } from '../../service/service-ts/Error-service';
import { ErreurComponent } from '../erreur/erreur.component';
import { FooteComponent } from '../foote/foote.component';
import { HeaderUtilisateurComponent } from '../header-utilisateur/header-utilisateur.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgIf,ErreurComponent,HeaderUtilisateurComponent,FooteComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  constructor(public errorService: ErrorService) {
    this.verificationAuthorization();
  }
  verificationAuthorization(){
    authServ.isAuthorize(["CLIENT"],(data:any)=>{},(error:any)=>{
      this.errorService.afficheError(error.message);
    })
  }
}
