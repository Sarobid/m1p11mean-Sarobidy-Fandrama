import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-reservation-par-jour',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './reservation-par-jour.component.html',
  styleUrl: './reservation-par-jour.component.css'
})
export class ReservationParJourComponent implements OnInit{
  data={
    dateDebut :'',
    dateFin :''
  }
  jourChart : any = null;
  loadingJour : boolean = false;
  nombreJours : any []=[];
  constructor(private errorService: ErrorService){
  }
  ngOnInit(): void {
    this.setNombreJours();
  }
  recherche(){
    this.setNombreJours();
  }

  setNombreJours(){
    this.loadingJour = true;
    if(this.jourChart !== null){
      this.jourChart.destroy();
    }
    rendServ.getReservationParJour(this.data,(data:any)=>{
      this.nombreJours = data;
     this.jourChart= rendServ.afficheChart(this.nombreJours.map((row:any)=>new Date(row._id.date).toLocaleDateString()),
      this.nombreJours.map((row:any)=>row.count),"Réservation","#jourChart");
      this.loadingJour = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loadingJour = false;
    })
  }

  
}
