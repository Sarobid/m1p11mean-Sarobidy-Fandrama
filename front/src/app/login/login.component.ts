import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  utilisateur={
    email:'',
    mdp:''
  }
  erreurs: any = {};

  constructor(){}
  onSubmit(){
    utilisateurService.login(this.utilisateur,(data:any)=>{
      alert(JSON.stringify(data));
    },(err:any)=>{
      this.erreurs = err.erreur;
    })
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
