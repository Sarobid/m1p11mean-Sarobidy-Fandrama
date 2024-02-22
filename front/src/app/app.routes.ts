import { Routes } from '@angular/router';
import { HeadPageLibreComponent } from "./head-page-libre/head-page-libre.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ValidMotDePasseComponent } from "./valid-mot-de-passe/valid-mot-de-passe.component";

export const routes: Routes = [
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
