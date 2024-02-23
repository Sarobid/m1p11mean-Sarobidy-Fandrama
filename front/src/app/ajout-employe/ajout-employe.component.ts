import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';

@Component({
  selector: 'app-ajout-employe',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './ajout-employe.component.html',
  styleUrl: './ajout-employe.component.css'
})
export class AjoutEmployeComponent implements OnInit{
  sexes: any[] = [];
  utilisateur = {
    personne: {
      nom: '',
      prenom: '',
      dateNaissance: "",
      sexe_id: {
        _id: ''
      },
      tel: '',
      cin:''
    },
    email:''
  }
  erreurs: any = {};
  validation:boolean = false;
  constructor(private errorService: ErrorService){
    
  }
  ngOnInit(): void {
    utilisateurService.getListeSexes((data: any[]) => {
      this.sexes = data;
      console.log(this.sexes);
    });
  }
  
  deValidation(){
    this.validation = false;
  }
  onSubmit(){
    utilisateurService.nouveauPersonnel(this.utilisateur,(data:any)=>{
      this.validation = true;
      this.utilisateur = {
        personne: {
          nom: '',
          prenom: '',
          dateNaissance: "",
          sexe_id: {
            _id: ''
          },
          tel: '',
          cin:''
        },
        email:''
      }
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }else{
        this.erreurs = error.erreur;
      }
    });
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
