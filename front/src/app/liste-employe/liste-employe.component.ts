import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorService } from '../../service/service-ts/Error-service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-liste-employe',
  standalone: true,
  imports: [NgFor,LoadingComponent,NgIf,FormsModule],
  templateUrl: './liste-employe.component.html',
  styleUrl: './liste-employe.component.css'
})
export class ListeEmployeComponent implements OnInit{
  listeEmploye : [] = [];
  listeEmployeFiltrer : any =[];
  loading = false;
  socketEmploye : any=null;
  sexes:any[]=[];
  search={
    nom:'',
    prenom:'',
    sexe:'',
    tel:''
  }
  constructor(private errorService: ErrorService){
    this.socketEmploye = utilSocket.listeEmploye();
  }
  ngOnInit(): void {
    utilisateurService.getListeSexes((data: any[]) => {
      this.sexes = data;
    });
    this.setListeEmploye();
    setInterval(()=>{
      this.socketEmploye.connect(()=>{
        this.setListeEmploye();
      });
    },socketService.delai);
  }

  recherche(){
    this.loading = true;
    this.listeEmployeFiltrer = this.listeEmploye.filter((utili:any) => {
      let employe = utili.personne_id;
      let is = true;
      let b = "";
      if (this.search.nom !== '' && !employe.nom.toLowerCase().includes(this.search.nom.toLowerCase())) {
          is = false;
      }
      if (this.search.prenom !== '' && !employe.prenom.toLowerCase().includes(this.search.prenom.toLowerCase())) {
        is = false;
      }
      if (this.search.sexe !== '' && employe.sexe_id._id!== this.search.sexe) {
        is = false;
      }
      if (this.search.tel !== '' && !employe.tel.toLowerCase().includes(this.search.tel.toLowerCase())) {
        is = false;
      }
      return is;
  });
  this.loading = false;
  }

  deleteEmploye(id:String){
    if (confirm("Voulez-vous vraiment supprimer cet Personnel ?")) {
      this.loading = true;
      utilisateurService.deleteEmploye(id,(data:any)=>{
        this.loading = false;
        this.socketEmploye.signale("delete");
      },(error:any)=>{
        this.errorService.afficheError(error.message);
      });  
    }
  }
  setListeEmploye(){
    this.loading = true;
    utilisateurService.listeEmploye({},(data:any)=>{
      this.listeEmploye = data;
      this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
    });
  }
}
