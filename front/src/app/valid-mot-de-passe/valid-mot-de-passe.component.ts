import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-valid-mot-de-passe',
  standalone: true,
  imports: [NgIf,FormsModule,LoadingComponent,RouterLink],
  templateUrl: './valid-mot-de-passe.component.html',
  styleUrl: './valid-mot-de-passe.component.css'
})
export class ValidMotDePasseComponent {
  utilisateur:any={
    email:'',
    id:''
  }
  mdp={
    mdp:'',
    mdpConf:''
  }
  erreurs: any = {};
  errorBad : any = {};
  loading = false;
  isInscrit = false;
  constructor(private route: ActivatedRoute,private router : Router){
  }
  ngOnInit(): void {
    this.loading = true;
    let id = this.route.snapshot.paramMap.get("id");
    utilisateurService.getvalidationEnterMdp(id,(data:any)=>{
      this.utilisateur.email = data.email;
      //this.utilisateur.email = confApp.nomApp();
      this.utilisateur.id=data._id;
      this.loading = false;
    },(err:any)=>{
      this.loading = false;
      this.errorBad['message'] = err.message;
    });
  }
  onSubmit(){
    this.loading = true;
    utilisateurService.validationMotDePasse(this.utilisateur.id,this.mdp,(data:any)=>{
      this.loading = false;
      this.isInscrit = true;
      //this.router.navigate(['/connexion']);
    },(err:any)=>{
      this.loading = false;
      this.erreurs = err.erreur;
    });
  }
  effacerErreur(champ: string) {
    if (this.erreurs && this.erreurs[champ]) {
      delete this.erreurs[champ];
    }
  }
}
