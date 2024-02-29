import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-chiffre-affaire-jour',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './chiffre-affaire-jour.component.html',
  styleUrl: './chiffre-affaire-jour.component.css'
})
export class ChiffreAffaireJourComponent implements OnInit{
  data={
    dateDebut :'',
    dateFin :''
  }
  loadingJour : boolean = false;
  nombreJours : any []=[];
  socket : any = null;
  constructor(private errorService: ErrorService){
    this.socket = utilSocket.rendez(); 
  }
  ngOnInit(): void {
    this.setNombreJours();
    setInterval(()=>{
      this.socket.connect(()=>{
        this.setNombreJours();
      });
    },socketService.delai);
  }
  recherche(){
    this.setNombreJours();
  }

  setNombreJours(){
    this.loadingJour = true;
    chiffServ.getChiffreParJour(this.data,(data:any)=>{
      this.nombreJours = data;
      this.loadingJour = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loadingJour = false;
    })
  }
}
