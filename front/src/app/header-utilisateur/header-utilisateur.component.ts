import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleAppComponent } from '../title-app/title-app.component';

@Component({
  selector: 'app-header-utilisateur',
  standalone: true,
  imports: [TitleAppComponent],
  templateUrl: './header-utilisateur.component.html',
  styleUrl: './header-utilisateur.component.css'
})
export class HeaderUtilisateurComponent implements OnInit{
  utilisateur : any = null;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.utilisateur = authServ.getUtilisateur();
  }

  deconnection(){
    authServ.deconnection();
    this.router.navigate(['/connexion']);
  }
}
