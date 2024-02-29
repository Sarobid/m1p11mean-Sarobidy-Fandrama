import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-historique-rendez-vous',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './historique-rendez-vous.component.html',
  styleUrl: './historique-rendez-vous.component.css'
})
export class HistoriqueRendezVousComponent implements OnInit{
  listeRendezVous : any []=[];
  services : any []=[];
  servicesFilter:any[]=[];
  loading : boolean = false;
  service : any = "";
  data ={
    employe_id:'',
    service_id:'',
    dateDebut:'',
    dateFin:'',
    heureMin:'',
    heureMax:'',
    etat:null
  };
  socket : any = null;
  constructor(private errorService: ErrorService){
    this.socket = utilSocket.rendez();
   
  }
   ngOnInit(): void {
       this.setListeRendezVous();
       this.setListeService();
       setInterval(()=>{
        this.socket.connect(()=>{
          this.setListeRendezVous();
        });
      },socketService.delai);
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
    })
   }
   setListeRendezVous(){
    this.loading = true;
    rendServ.getHistoriqueRendezVous(this.data,(data:any)=>{
    //  alert(JSON.stringify(data))
      this.listeRendezVous = data;
      this.loading = false;
    },(error:any)=>{
      if(error.status === 401 || error.status === 403){
        this.errorService.afficheError(error.message);
      }
      console.log(error)
      this.loading = false;
    })
   }
}
