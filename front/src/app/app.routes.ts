import { Routes } from '@angular/router';
import { AjoutEmployeComponent } from './ajout-employe/ajout-employe.component';
import { AjoutHoraireComponent } from './ajout-horaire/ajout-horaire.component';
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';
import { HeadPageLibreComponent } from "./head-page-libre/head-page-libre.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { ListeEmployeComponent } from './liste-employe/liste-employe.component';
import { ListeHoraireComponent } from './liste-horaire/liste-horaire.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from "./manager/manager.component";
import { NouveauRendezVousComponent } from './nouveau-rendez-vous/nouveau-rendez-vous.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StatistiqueHoraireComponent } from './statistique-horaire/statistique-horaire.component';
import { ValidMotDePasseComponent } from "./valid-mot-de-passe/valid-mot-de-passe.component";

export const routes: Routes = [
    { path: 'client', component: ClientComponent ,
    children:[
        {path:"nouveau",component:NouveauRendezVousComponent}
    ]},
    { path: 'personnel', component: EmployeComponent ,
    children:[
        {path:'nouveau-horaire',component:AjoutHoraireComponent},
        {path:'liste-horaire',component:ListeHoraireComponent},
    ]},
    { path: 'manager', component: ManagerComponent ,
    children:[
        { path: 'nouveau-personnel', component: AjoutEmployeComponent },
        { path: 'liste-personnel',component:ListeEmployeComponent},
        { path: 'temps-moyen-travail',component:StatistiqueHoraireComponent}
    ]},
    {
        path: '', component: HeadPageLibreComponent,
        children: [

            { path: 'inscription', title: "Inscription", component: InscriptionComponent },
            { path: 'inscription/:id', title: "Inscription", component: ValidMotDePasseComponent },
            { path: 'connexion', title: "Connexion", component: LoginComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent },
];
