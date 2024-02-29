import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-liste-service',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,LoadingComponent],
  templateUrl: './liste-service.component.html',
  styleUrl: './liste-service.component.css'
})
export class ListeServiceComponent {
  loading : boolean = false;
  loadingModif : boolean = false;
  service = {
    id : '',
    nom : '',
    prix:'',
    duree:'',
    commission :''
  }
  searh={
    nom: '',
    prixMin : '',
    prixMax : '',
    dureeMin:'',
    dureeMax:''
  }
  listeServiceFiltre : any [] = [];
  listeService : any []=[];
  socketService : any = null;
  erreurs : any = null;
  constructor(private errorService : ErrorService){
    this.socketService = utilSocket.listeService();
  }

  ngOnInit(): void {
    this.setHoraitreTravail();
    setInterval(()=>{
      this.socketService.connect(()=>{
        this.setHoraitreTravail();
      });
    },socketService.delai);
  }
  validation = false;
  voirTout(){
    this.searh={
      nom: '',
      prixMin : '',
      prixMax : '',
      dureeMin:'',
      dureeMax:''
    } 
    this.recherche();
  }
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  milliseconToHeure(milli: number): string {
    const hours = Math.floor(milli / (1000 * 60 * 60));
    const minutes = Math.floor((milli % (1000 * 60 * 60)) / (1000 * 60));
    let durees = hours+'h '+minutes+'min';
    return durees;
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
  afficheModal(id:any,nom:any,prix:any,duree:any,commission:any){
    this.service.nom = nom;
    this.service.prix = prix;
    this.service.duree = duree;
    this.service.commission = commission;
    this.service.id = id;
    this.deValidation();
    this.loadingModif = false;
    this.erreurs = null;
  }
  supprimer(id:any){
    let data = {
      id : id
    };
    this.loading = true;
    serviceService.delete(data,(data:any)=>{
      this.socketService.signale("supp");
      this.listeService = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }
  activer(id:any){
    let data = {
      id : id
    };
    this.loading = true;
    serviceService.active(data,(data:any)=>{
      this.socketService.signale("act");
      this.listeService = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }
  modifier(){
    this.loadingModif = true;
    let data = {
      id : this.service.id,
      nom : this.service.nom,
      prix : this.service.prix,
      duree : this.service.duree,
      commission : this.service.commission
    }
    serviceService.update(data,(data:any)=>{
      this.socketService.signale("upd");
      this.loadingModif = false;
      this.validation = true;
      // this.service.date_av = serv.afficheDate(new Date(this.horaire.date));
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
    this.listeServiceFiltre = this.listeService.filter((h:any)=>{
      let is = true;
      let d = h.prix;
      if (this.searh.nom !== '' && !h.nom.toLowerCase().includes(this.searh.nom.toLowerCase())) {
        is = false;
      }
    
      if(this.searh.prixMin !== '' && parseInt(this.searh.prixMin) > d ){
        is = false;
      }
      if(this.searh.prixMax !== '' && parseInt(this.searh.prixMax) < d ){
        is = false;
      }
      if(this.searh.dureeMin !== '' && this.searh.dureeMin > h.commission ){
        is = false;
      }
      if(this.searh.dureeMax !== '' && this.searh.dureeMax < h.commission ){
        is = false;
      }
      // h.date = d;
      // h['dateFormat'] = serv.afficheDate(d);
      // h['dureeFormat'] = serv.afficheDureMilliseconde(h.duree);
      return is;
    })
    this.loading = false;
  }
  setHoraitreTravail(){
    this.loading = true;
    serviceService.getAll((data:any)=>{
      this.listeService = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }

}
