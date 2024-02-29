import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ErrorService } from '../../service/service-ts/Error-service';

@Component({
  selector: 'app-ajout-service',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './ajout-service.component.html',
  styleUrl: './ajout-service.component.css'
})
export class AjoutServiceComponent {
  services: any[] = [];
  service = {
      nom: '',
      prix: '',
      duree: "",
      commission: ''
  }
  loading : boolean = false;
  validation : boolean = false;
  erreurs: any = {};
  socketService: any = null;
  constructor() { }
  
  ngOnInit(): void {
    this.socketService = utilSocket.listeService();
    setInterval(()=>{
      this.socketService.connect(()=>{});
    },socketService.delai);
  }
  onSubmit() {
    serviceService.nouveauService(this.service,(data:any)=>{
      // alert(JSON.stringify(data));
      this.socketService.signale("new");
      this.service = {
        nom: '',
        prix: '',
        duree: "",
        commission: ''
    }
    this.loading = false;
    alert("ajouter avec succès")
    },(err:any)=>{
      this.erreurs = err.erreur;
      // alert(JSON.stringify(this.erreurs))
    })
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
