import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  sexes: any[] = [];
  utilisateur = {
    personne: {
      nom: '',
      prenom: '',
      dateNaissance: "",
      sexe_id: {
        _id: ''
      },
      tel: ''
    },
    email:''
    ,url:'http://localhost:4200/inscription/'
  }
  erreurs: any = {};
  validation:boolean = false;

  constructor() { }

  ngOnInit(): void {
    utilisateurService.getListeSexes((data: any[]) => {
      this.sexes = data;
      console.log(this.sexes);
    });
  }
  onSubmit() {
    utilisateurService.nouveauClient(this.utilisateur,(data:any)=>{
      this.validation = true;
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
