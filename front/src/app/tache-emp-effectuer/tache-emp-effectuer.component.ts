import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-tache-emp-effectuer',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './tache-emp-effectuer.component.html',
  styleUrl: './tache-emp-effectuer.component.css'
})
export class TacheEmpEffectuerComponent {
  listeRendezVous : any []=[];
  services : any []=[];
  servicesFilter:any[]=[];
  loading : boolean = false;
  service : any = "";
  totalCommission : any = 0;
  data ={
    client_id:'',
    service_id:'',
    dateDebut:'',
    dateFin:'',
    heureMin:'',
    heureMax:'',
    etat:1
  }
  constructor(private errorService: ErrorService){
   }
   ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.data.dateDebut = today;
    this.data.dateFin = today;
       this.setListeRendezVous();
       this.setListeService();
   }
   recherche(){
    this.setListeRendezVous();
   }
   filtrerService(){
    this.servicesFilter = this.services.filter((row:any)=>{
      console.log(row);
      let is = false;
      if(row.nom.toLowerCase().includes(this.service.toLowerCase())){
        is = true;
      }
      return is;
    })
   }
   setService_Id(id:any,nom:any){
    this.data.service_id = id;
    this.service = nom;
    this.servicesFilter = [];
    this.recherche();
   }
   setListeService(){
    serviceService.getAllActive((data:any)=>{
      this.services = data;
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }
    })
   }
   setListeRendezVous(){
    this.loading = true;
    rendServ.RendezVousEmploye(this.data,(data:any)=>{
    //  alert(JSON.stringify(data))
      this.listeRendezVous = data;
      this.totalCommission = 0;
      // console.log(this.listeRendezVous);
      this.listeRendezVous.map(rdv =>{
        this.totalCommission = this.totalCommission + this.calculCommission(rdv.commission,rdv.prix);
      })
      this.totalCommission = serv.formatPrice(this.totalCommission);
      this.loading = false;
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }
      console.log(error)
      this.loading = false;
    })
   }
   calculCommission(commission:any,prix:any){
    let comm = (prix*commission)/100
    return comm;
   }
}
