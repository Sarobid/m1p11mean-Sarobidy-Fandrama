import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-ajout-horaire',
  standalone: true,
  imports: [NgIf,FormsModule,LoadingComponent],
  templateUrl: './ajout-horaire.component.html',
  styleUrl: './ajout-horaire.component.css'
})
export class AjoutHoraireComponent implements OnInit{
  loading : boolean = false;
  horaire={
    date : '',
    heure_debut:'',
    heure_fin:'',
    date_fin:''
  }
  erreurs: any = {};
  validation : boolean = false;
  socketHoraire : any = null;
  constructor(private errorService : ErrorService){}

  ngOnInit(): void {
    this.socketHoraire = utilSocket.horaire();
    setInterval(()=>{
      this.socketHoraire.connect(()=>{});
    },socketService.delai);
  }

  onSubmit(){
    this.loading = true;
    horServ.insertion(this.horaire,(data:any)=>{
      this.loading = false;
      this.validation = true;
      this.horaire={
        date : '',
        heure_debut:'',
        heure_fin:'',
        date_fin:''
      }
      this.socketHoraire.signale("new");
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }else{
        this.erreurs = error.erreur;
      }
      this.loading = false;
    });
  }
  
  deValidation(){
    this.validation = false;
  }
  
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
