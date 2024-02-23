import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf,LoadingComponent],
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
  }
  erreurs: any = {};
  validation:boolean = false;
  loading = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
    utilisateurService.getListeSexes((data: any[]) => {
      this.sexes = data;
      console.log(this.sexes);
    });
  }
  onSubmit() {
    this.loading = true;
    utilisateurService.nouveauClient(this.utilisateur,(data:any)=>{
      this.validation = true;
      this.loading = false;
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
