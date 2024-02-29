import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-chiffre-affaire-mois',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule,LoadingComponent],
  templateUrl: './chiffre-affaire-mois.component.html',
  styleUrl: './chiffre-affaire-mois.component.css'
})
export class ChiffreAffaireMoisComponent implements OnInit{
  data={
    annee : ''
  }
  loadingJour : boolean = false;
  nombreJours : any []=[];
  socket : any = null;
  listeMois : any = [];
  constructor(private errorService: ErrorService){
    this.listeMois = serv.getMois();
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
    chiffServ.getChiffreParMois(this.data,(data:any)=>{
      this.nombreJours = data;
      this.nombreJours = this.nombreJours.filter((row:any)=>{
        row['dateFormat'] = this.listeMois[row._id-1];
        return true;
      })
      this.loadingJour = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loadingJour = false;
    })
  }
}
