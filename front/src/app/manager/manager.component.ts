import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ErrorService } from '../../service/service-ts/Error-service';
import { ErreurComponent } from '../erreur/erreur.component';
import { FooteComponent } from '../foote/foote.component';
import { HeaderUtilisateurComponent } from '../header-utilisateur/header-utilisateur.component';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgIf,ErreurComponent,HeaderUtilisateurComponent,FooteComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent{
  constructor(public errorService: ErrorService) {
    this.verificationAuthorization();
  }
  verificationAuthorization(){
    authServ.isAuthorize(["MANAGER"],(data:any)=>{},(error:any)=>{
      this.errorService.afficheError(error.message);
    })
  }
}
