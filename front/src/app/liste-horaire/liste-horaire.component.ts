import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-liste-horaire',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,LoadingComponent],
  templateUrl: './liste-horaire.component.html',
  styleUrl: './liste-horaire.component.css'
})
export class ListeHoraireComponent implements OnInit {
  loading : boolean = false;
  loadingModif : boolean = false;
  horaire = {
    id : '',
    date : '',
    heure_debut:'',
    heure_fin:'',
    date_fin:'',
    date_av :'',
    date_fin_format:''
  }
  searh={
    datedebut : '',
    dateFin : '',
    heure_debut:'',
    heure_fin:''
  }
  listeHoraireFiltre : any [] = [];
  listeHoraire : any []=[];
  socketHoraire : any = null;
  erreurs : any = null;
  constructor(private errorService : ErrorService){
    this.socketHoraire = utilSocket.horaire();
  }

  ngOnInit(): void {
    this.setHoraitreTravail();
    setInterval(()=>{
      this.socketHoraire.connect(()=>{
        this.setHoraitreTravail();
      });
    },socketService.delai);
  }
  validation = false;
  voirTout(){
    this.searh={
      datedebut : '',
      dateFin : '',
      heure_debut:'',
      heure_fin:'',
    } 
    this.recherche();
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
  afficheModal(id:any,date:any,heure_debut:any,heure_fin:any,date_fin:any){
    this.horaire.date_av = serv.afficheDate(date);
    this.horaire.date_fin_format = serv.afficheDate(date_fin);
    this.horaire.date_fin = date_fin.toDateString();
    this.horaire.date = date.toDateString();
    this.horaire.heure_debut = heure_debut;
    this.horaire.heure_fin = heure_fin;
    this.horaire.id = id;
    this.deValidation();
    this.loadingModif = false;
    this.erreurs = null;
  }
  modifier(){
    this.loadingModif = true;
    horServ.update(this.horaire.id,this.horaire,(data:any)=>{
      this.loadingModif = false;
      this.socketHoraire.signale("upd");
      this.validation = true;
      this.horaire.date_av = serv.afficheDate(new Date(this.horaire.date));
      this.horaire.date_fin_format = serv.afficheDate(new Date(this.horaire.date_fin));
    },(error:any)=>{
      this.loadingModif = false;
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }else{
        this.erreurs = error.erreur;
      }
    });
  }
  deValidation(){
    this.validation = false;
  }
  recherche(){
    this.loading = true;
    this.listeHoraireFiltre = this.listeHoraire.filter((h:any)=>{
      let is = true;
      let d = new Date(h.date);
      if(this.searh.datedebut !== '' && new Date(this.searh.datedebut) > d ){
        is = false;
      }
      if(this.searh.dateFin !== '' && new Date(this.searh.dateFin) < d ){
        is = false;
      }
      if(this.searh.heure_debut !== '' && this.searh.heure_debut !== h.heure_debut ){
        is = false;
      }
      if(this.searh.heure_fin !== '' && this.searh.heure_debut !== h.heure_fin ){
        is = false;
      }
      h.date = d;
      h['dateFormat'] = serv.afficheDate(d);
      h['dureeFormat'] = serv.afficheDureMilliseconde(h.duree);
      h.date_fin = new Date(h.date_fin);
      h['dateFinFormat'] = serv.afficheDate(h.date_fin);
      return is;
    })
    this.loading = false;
  }
  setHoraitreTravail(){
    this.loading = true;
    horServ.getAll((data:any)=>{
      this.listeHoraire = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }

}