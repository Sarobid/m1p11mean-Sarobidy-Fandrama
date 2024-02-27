import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf,FormsModule,RouterLink,LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  utilisateur={
    email:'',
    mdp:''
  }
  erreurs: any = {};
  loading = false;

  constructor(private router: Router){}
  onSubmit(){
    this.loading = true;
    utilisateurService.login(this.utilisateur,(data:any)=>{
      this.loading = false;
      authServ.enregistrementUtilisateur(data.utilisateur);
      authServ.enregistrementToken(data.token);
      if(data.utilisateur.role_id.role==="MANAGER"){
        this.router.navigate(['/manager']);
      }else if(data.utilisateur.role_id.role==="EMPLOYE"){
        this.router.navigate(['/personnel']);
      }else{
        this.router.navigate(['/client']);
      }
    },(err:any)=>{
      this.loading = false;
      this.erreurs = err.erreur;
    })
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
