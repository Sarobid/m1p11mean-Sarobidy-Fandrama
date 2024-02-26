import { Routes } from '@angular/router';
import { InscriptionComponent } from "./inscription/inscription.component";
import { ServiceComponent } from './service/service.component';

export const routes: Routes = [
    {path : 'inscription' , component : InscriptionComponent},
    {path : 'service' , component : ServiceComponent},
    ];
