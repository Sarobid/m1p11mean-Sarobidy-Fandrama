import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ErrorService } from '../../service/service-ts/Error-service';
import { ErreurComponent } from '../erreur/erreur.component';
import { HeaderUtilisateurComponent } from '../header-utilisateur/header-utilisateur.component';
import { FooteComponent } from '../foote/foote.component';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgIf,ErreurComponent,HeaderUtilisateurComponent,FooteComponent],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent{
  constructor(public errorService: ErrorService) {
    this.verificationAuthorization();
  }
  verificationAuthorization(){
    authServ.isAuthorize(["EMPLOYE"],(data:any)=>{},(error:any)=>{
      this.errorService.afficheError(error.message);
    })
  }
}
