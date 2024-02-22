import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-valid-mot-de-passe',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './valid-mot-de-passe.component.html',
  styleUrl: './valid-mot-de-passe.component.css'
})
export class ValidMotDePasseComponent {
  utilisateur:any={
    email:'',
    id:''
  }
  mdp={
    mdp:'',
    mdpConf:''
  }
  erreurs: any = {};
  errorBad : any = {};
  
  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    utilisateurService.getvalidationEnterMdp(id,(data:any)=>{
      this.utilisateur.email = data.email;
      //this.utilisateur.email = confApp.nomApp();
      this.utilisateur.id=data._id;
    },(err:any)=>{
      this.errorBad['message'] = err.message;
    });
  }
  onSubmit(){
    utilisateurService.validationMotDePasse(this.utilisateur.id,this.mdp,(data:any)=>{
      alert(data);
    },(err:any)=>{
      this.erreurs = err.erreur;
    });
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
