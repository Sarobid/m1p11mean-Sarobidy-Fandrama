import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  isErreur: boolean = false;
  erreur: string = 'hhhghg';

  afficheError(erreur: string) {
    this.isErreur = true;
    this.erreur = erreur;
  }
}
