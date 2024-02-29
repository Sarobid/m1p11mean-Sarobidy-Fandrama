import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-reservartion-par-mois',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './reservartion-par-mois.component.html',
  styleUrl: './reservartion-par-mois.component.css'
})
export class ReservartionParMoisComponent implements OnInit{
  data ={
    annee :''
  }
  moisChart : any = null;
  loadingMois : boolean = false;
  nombreMois : any []=[];
  listeMois :any []=[];
  constructor(private errorService: ErrorService){
  this.listeMois = serv.getMois();
  }
  ngOnInit(): void {
    this.setNombreJours();
  }
  recherche(){
    this.setNombreJours();
  }

  setNombreJours(){
    this.loadingMois = true;
    if(this.moisChart !== null){
      this.moisChart.destroy();
    }
    rendServ.getReservationParMois(this.data,(data:any)=>{
      this.nombreMois = data;
     this.moisChart= rendServ.afficheChart(this.nombreMois.map((row:any)=>this.listeMois[row._id-1]),
      this.nombreMois.map((row:any)=>row.count),"Réservation","#moisChart");
      this.loadingMois = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loadingMois = false;
    })
  }
}
