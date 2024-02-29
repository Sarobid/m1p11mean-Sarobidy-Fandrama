import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-rdv-employe',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './rdv-employe.component.html',
  styleUrl: './rdv-employe.component.css'
})
export class RdvEmployeComponent {
  listeRendezVous : any []=[];
  services : any []=[];
  servicesFilter:any[]=[];
  loading : boolean = false;
  service : any = "";
  data ={
    client_id:'',
    service_id:'',
    dateDebut:'',
    dateFin:'',
    heureMin:'',
    heureMax:'',
    etat:0
  }
  socket : any = null;
  constructor(private errorService: ErrorService){
  this.socket = utilSocket.rendez(); 
  }
   ngOnInit(): void {
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
      this.loading = false;
      console.log(this.listeRendezVous);
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }
      console.log(error)
      this.loading = false;
    })
   }
   validerRdv(id: any){
    let datass = {
      _id : id
    }
    this.loading = true;
    console.log(datass);
    rendServ.TacheValide(datass,(data:any) => {
      this.loading = false;
      
      this.setListeRendezVous();
      this.socket.signale("ok");
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    })
   }
}
