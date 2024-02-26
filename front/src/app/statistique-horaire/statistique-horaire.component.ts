import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-statistique-horaire',
  standalone: true,
  imports: [NgFor,NgIf,LoadingComponent,FormsModule],
  templateUrl: './statistique-horaire.component.html',
  styleUrl: './statistique-horaire.component.css'
})
export class StatistiqueHoraireComponent implements OnInit{
  loading = false;
  searh = {
    temps_min:'',
    temps_max:'',
    nom:'',
    email:''
  }
  stateHoraire : any [] = [];
  stateHoraireFiltrer : any [] = [];

  socketHoraire:any = null;
  constructor(private errorService:ErrorService){
    this.socketHoraire = utilSocket.horaire();
  }
  voirTout(){
    this.searh = {
      temps_min:'',
      temps_max:'',
      nom:'',
      email:''
    }
    this.setStateHoraire();
  }
  recherche(){
    this.loading = true;
    this.stateHoraireFiltrer = this.stateHoraire.filter((h:any)=>{
      let is = true;
      if(this.searh.temps_min !== '' && serv.heureInMillisecconde(this.searh.temps_min) > h.moyenneDuree){
        is = false;
      }
      if(this.searh.temps_max !== '' && serv.heureInMillisecconde(this.searh.temps_max) < h.moyenneDuree){
        is = false;
      }
      if (this.searh.nom !== '' && !h.utilisateur.personne.nom.toLowerCase().includes(this.searh.nom.toLowerCase())) {
        is = false;
    }
    if (this.searh.email !== '' && !h.utilisateur.email.toLowerCase().includes(this.searh.email.toLowerCase())) {
      is = false;
    }
      h['dureeFormat'] = serv.afficheDureMilliseconde(h.moyenneDuree);
      return is;
    });
    this.loading = false;
  }

  ngOnInit(): void {
    this.setStateHoraire();
    setInterval(()=>{
      this.socketHoraire.connect(()=>{
        this.setStateHoraire();
      });
    },socketService.delai);
  }

  setStateHoraire(){
    this.loading = true;
    horServ.statistique((data:any)=>{
      this.stateHoraire = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }

}
