import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router){}
  onSubmit(){
    utilisateurService.login(this.utilisateur,(data:any)=>{
      authServ.enregistrementToken(data.token);
      if(data.utilisateur.role_id.role==="MANAGER"){
        this.router.navigate(['/manager']);
      }
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
