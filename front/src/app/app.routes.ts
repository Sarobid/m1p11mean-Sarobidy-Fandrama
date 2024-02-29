import { Routes } from '@angular/router';
import { AjoutEmployeComponent } from './ajout-employe/ajout-employe.component';
// import { ServiceComponent } from './service/service.component';
import { AjoutHoraireComponent } from './ajout-horaire/ajout-horaire.component';
import { AjoutServiceComponent } from './ajout-service/ajout-service.component';
import { ChiffreAffaireJourComponent } from './chiffre-affaire-jour/chiffre-affaire-jour.component';
import { ChiffreAffaireMoisComponent } from './chiffre-affaire-mois/chiffre-affaire-mois.component';
import { ClientComponent } from './client/client.component';
import { EmployeComponent } from './employe/employe.component';
import { HeadPageLibreComponent } from "./head-page-libre/head-page-libre.component";
import { HistoriqueRendezVousComponent } from './historique-rendez-vous/historique-rendez-vous.component';
import { InscriptionComponent } from "./inscription/inscription.component";
import { ListeEmployeComponent } from './liste-employe/liste-employe.component';
import { ListeHoraireComponent } from './liste-horaire/liste-horaire.component';
import { ListeServiceComponent } from './liste-service/liste-service.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from "./manager/manager.component";
import { NouveauRendezVousComponent } from './nouveau-rendez-vous/nouveau-rendez-vous.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PreferenceEmployeComponent } from './preference-employe/preference-employe.component';
import { PreferenceServiceComponent } from './preference-service/preference-service.component';
import { RdvEmployeComponent } from './rdv-employe/rdv-employe.component';
import { ReservartionParMoisComponent } from './reservartion-par-mois/reservartion-par-mois.component';
import { ReservationParJourComponent } from './reservation-par-jour/reservation-par-jour.component';
import { StatistiqueHoraireComponent } from './statistique-horaire/statistique-horaire.component';
import { TacheEmpEffectuerComponent } from './tache-emp-effectuer/tache-emp-effectuer.component';
import { ValidMotDePasseComponent } from "./valid-mot-de-passe/valid-mot-de-passe.component";
export const routes: Routes = [
    { path: 'client', component: ClientComponent ,
    children:[
        {path:'preference-service',component:PreferenceServiceComponent},
        {path:'preference-employe',component:PreferenceEmployeComponent},
        {path:"nouveau",component:NouveauRendezVousComponent},
        {path:"historique",component:HistoriqueRendezVousComponent},
    ]},
    { path: 'personnel', component: EmployeComponent ,
    children:[
        {path:'nouveau-horaire',component:AjoutHoraireComponent},
        {path:'liste-horaire',component:ListeHoraireComponent},
        {path:'rdv-employe',component:RdvEmployeComponent},
        {path:'tacheEmp',component:TacheEmpEffectuerComponent},
    ]},
    { path: 'manager', component: ManagerComponent ,
    children:[
        { path: 'nouveau-personnel', component: AjoutEmployeComponent },
        { path: 'liste-personnel',component:ListeEmployeComponent},
        { path: 'nouveau-service', component: AjoutServiceComponent },
        { path: 'liste-service',component:ListeServiceComponent},
        { path: 'temps-moyen-travail',component:StatistiqueHoraireComponent},
        {path:"reservation-jour",component:ReservationParJourComponent},
        {path:"reservation-mois",component:ReservartionParMoisComponent},
        {path:"chiffre-affaire-jour",component:ChiffreAffaireJourComponent},
        {path:"chiffre-affaire-mois",component:ChiffreAffaireMoisComponent}
    ]},
    {
        path: '', component: HeadPageLibreComponent,
        children: [
            { path: 'inscription', title: "Inscription", component: InscriptionComponent },
            { path: 'inscription/:id', title: "Inscription", component: ValidMotDePasseComponent },
            { path: 'connexion', title: "Connexion", component: LoginComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];
