import { Component } from '@angular/core';
import { ErrorService } from '../../service/service-ts/Error-service';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-preference-employe',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './preference-employe.component.html',
  styleUrl: './preference-employe.component.css'
})
export class PreferenceEmployeComponent {
  erreurs: any = {};
  loading : boolean = false;
  loadingModif : boolean = false;
  constructor(private errorService : ErrorService){};
  listeEmploye : any []=[];
  done : any[] = [];
  ngOnInit(): void {
    let client = authServ.getUtilisateur()._id;
    // console.log("ito le id"+client);
    let datas = {
      client_id : client
    };
    prefEmp.getById(datas,(data:any)=>{
      // console.log(data);
      data.forEach((obj: any) => {
        // Access the 'employe_id' property of each object and push it to the 'serviceIds' array
        this.done.push(obj.employe_id);
      });
      // this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
    prefEmp.getAlls(datas,(data:any)=>{
      // console.log(data);
      this.listeEmploye = data;
      // this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
  }

 
  formatPrice(price: number): string {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  milliseconToHeure(milli: number): string {
    const hours = Math.floor(milli / (1000 * 60 * 60));
    const minutes = Math.floor((milli % (1000 * 60 * 60)) / (1000 * 60));
    let durees = hours+'h '+minutes+'min';
    return durees;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);


    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // console.log(event.item.element.nativeElement.getAttribute('data-id'));
      // console.log(event.container.id);
      if(event.container.id == 'employe'){
        // console.log("ito fafana "+event.item.element.nativeElement.getAttribute('data-id'));
        let service = event.item.element.nativeElement.getAttribute('data-id');
        let client = authServ.getUtilisateur()._id;
        let datas = {
          client_id : client,
          employe_id : service
        };
        prefEmp.deletes(datas,(data:any)=>{
          // alert("niala");
        }),(err:any)=>{
          this.erreurs = err.erreur;
          alert(JSON.stringify(this.erreurs))
        }
      }else{
        // console.log("ito ampidirina "+event.item.element.nativeElement.getAttribute('data-id'));
        let service = event.item.element.nativeElement.getAttribute('data-id');
        let client = authServ.getUtilisateur()._id;
        let datas = {
          client_id : client,
          employe_id : service
        };
        prefEmp.nouveauPref(datas,(data:any)=>{
          // alert("tafiditra");
        }),(err:any)=>{
          this.erreurs = err.erreur;
          alert(JSON.stringify(this.erreurs))
        }
      }
    }
  }
}
