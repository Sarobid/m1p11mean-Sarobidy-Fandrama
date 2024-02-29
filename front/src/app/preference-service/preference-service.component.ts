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
  selector: 'app-preference-service',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './preference-service.component.html',
  styleUrl: './preference-service.component.css'
})
export class PreferenceServiceComponent {
  erreurs: any = {};
  loading : boolean = false;
  loadingModif : boolean = false;
  constructor(private errorService : ErrorService){};
  listeService : any []=[];
  done : any[] = [];
  ngOnInit(): void {
    let client = authServ.getUtilisateur()._id;
    console.log("ito le id"+client);
    let datas = {
      client_id : client
    };
    prefServ.getById(datas,(data:any)=>{
      console.log(data);
      data.forEach((obj: any) => {
        // Access the 'service_id' property of each object and push it to the 'serviceIds' array
        this.done.push(obj.service_id);
      });
      // this.recherche();
      this.loading = false;
    },(error:any)=>{
      this.errorService.afficheError(error.message);
      this.loading = false;
    });
    prefServ.getAlls(datas,(data:any)=>{
      console.log(data);
      this.listeService = data;
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
      if(event.container.id == 'service'){
        // console.log("ito fafana "+event.item.element.nativeElement.getAttribute('data-id'));
        let service = event.item.element.nativeElement.getAttribute('data-id');
        let client = authServ.getUtilisateur()._id;
        let datas = {
          client_id : client,
          service_id : service
        };
        prefServ.deletes(datas,(data:any)=>{
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
          service_id : service
        };
        prefServ.nouveauPref(datas,(data:any)=>{
          // alert("tafiditra");
        }),(err:any)=>{
          this.erreurs = err.erreur;
          alert(JSON.stringify(this.erreurs))
        }
      }
    }
  }
}
