import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-nouveau-rendez-vous',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent,NgClass],
  templateUrl: './nouveau-rendez-vous.component.html',
  styleUrl: './nouveau-rendez-vous.component.css'
})
export class NouveauRendezVousComponent implements OnInit{
  erreurs : any = null;
  loadingService = false;
  services : any []=[];
  servicesFilter : any []= [];
  servicesReserver : any []=[];
  servicesReserverFilter : any [] = [];
  service : any = null;
  serviceRe : any = null;
  date : any = null;
  employeDisp : any [] = [];
  showModalFlag : boolean = false;
  loadingEmp : boolean = false;
  loadingReserver : boolean = false;
  prixTotal : any = 0;
  paye : any = 0;
  constructor(private errorService: ErrorService,private elementRef: ElementRef){
  }
  ngOnInit(): void {
    this.setServices();
  }
  nouveau(){
    serv.reloadePage();
  }
  showModal(){
    this.showModalFlag = true;
  }
  hideModal(){
    this.showModalFlag = false;
    if(this.erreurs.paye !== null){
      this.erreurs.paye = null;
    }
  }
  calculPrixToal(){
    this.prixTotal = 0;
    this.servicesReserver.forEach((row:any)=>{
      this.prixTotal = this.prixTotal + row.prix;
    });
    this.prixTotal = serv.formatPrice(this.prixTotal);
  }
  recherche(){    
    this.servicesFilter = this.services.filter((service : any)=>{
      let is = true;
      service['dureeFormat'] = serv.afficheDureMilliseconde(service.duree);
      service['prixFormat'] = serv.formatPrice(service.prix);
      let i = 0;
      for(i = 0 ; i < this.servicesReserver.length ; i++){
        if(this.servicesReserver[i].service._id === service._id){
          is = false;
          break;
        }    
      }
      return is;
    })
  }
  rechercheservicesReserverFilter(){
    this.servicesReserverFilter = this.servicesReserver.filter((service:any)=>{
      service['dureeFormat'] = serv.afficheDureMilliseconde(service.duree);
      service['prixFormat'] = serv.formatPrice(service.prix);
      return true;
    });
  }
  allowDropService(ev:any) {
    ev.preventDefault();
  }
  allowDropRendez(ev:any) {
    ev.preventDefault();
  }
  dropS(ev:any){
    ev.preventDefault();
    this.enleverServiceAuReservation();
  }  
  dropReseve(ev:any) {
    ev.preventDefault();
    this.getListEmplDispo();
  }

  dragReserver(ev:any,serviceRe : any){
    ev.dataTransfer.setData("text", ev.target.id);
    this.serviceRe = serviceRe;
  }
  dragService(ev:any,service:any) {
    ev.dataTransfer.setData("text", ev.target.id);
    this.service = service;
  }
  validationEmploye(employe:any){
    let value = {service : this.service,employe:employe};
    this.loadingReserver = true;
    rendServ.nouveauRendezVous(this.paye,this.date,value,(data:any)=>{
      this.loadingReserver = false;
      this.servicesReserver = data;
      this.calculPrixToal();
      this.rechercheservicesReserverFilter();
      this.recherche();
      this.service = null;
      this.hideModal();
    },(error:any)=>{
      this.loadingReserver = false;
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }else{
        if(error.status === 400){
          this.hideModal();
        }
        this.erreurs = error.erreur;
      }
      this.loadingEmp = false;
    })
  }

  getListEmplDispo(){
    this.paye = 0;
    if(this.service !== null){
      this.showModal();
    this.loadingEmp = true;
    rendServ.getHeureEmployeDisp(this.date,this.service._id,(data:any)=>{
      this.employeDisp = data;
      this.loadingEmp = false;
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }else{
        this.erreurs = error.erreur;
      }
      this.hideModal();
      this.loadingEmp = false;
    })
    }
  }
  enleverServiceAuReservation(){
    if(this.serviceRe !== null){
      this.loadingReserver = true;
      rendServ.annulerRendezVous(this.serviceRe._id,(data:any)=>{
        this.loadingReserver = false;
        this.servicesReserver = data;
        this.serviceRe = null;
        this.calculPrixToal();
        this.rechercheservicesReserverFilter();
        this.recherche();

      },(error:any)=>{
        if(error.status === 401 || error.status === 403){
          this.errorService.afficheError(error.message);
        }else{
          this.erreurs = error.erreur;
        }
        this.loadingReserver = false;
      })
    }
  }
  setServices(){
    this.loadingService = true;
    serv.getAllService((data:any)=>{
      this.services = data;
      this.recherche();
      this.loadingService = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
    });
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
