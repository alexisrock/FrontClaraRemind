import { Component, OnDestroy } from '@angular/core';
import { RecordatoriosResponse } from '../../../core/domain/models/response/recordatoriosResponse';
import { CommonModule, NgFor, Location  } from '@angular/common';
import { DataStore } from '../../../data/stores/data.store';
import { Subscription } from 'rxjs';
import { RecordatorioUseCase } from '../../../core/domain/usecases/recordatorio/recordatorio-use-case';
import { HttpDashboardServiceService } from '../../../data/services/http-dashboard-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { RecordatorioRequest } from '../../../core/domain/models/request/recordatorioRequest';
import { LoaddingComponent } from "../../shared/loadding/loadding.component";
import { LoadingStore } from '../../../data/stores/loading.store';


@Component({
  selector: 'app-listrecordatorios',
  imports: [NgFor, CommonModule, LoaddingComponent],
  templateUrl: './listrecordatorios.component.html',
  styleUrl: './listrecordatorios.component.scss'
})
export class ListrecordatoriosComponent implements OnDestroy {

  recordatoriosResponse: RecordatoriosResponse[] = []

  private readonly recordatorioStoreSubscription: Subscription | undefined;
  private readonly recordatorioUseCase: RecordatorioUseCase;

  constructor(public router: Router, private readonly dataStore: DataStore,
    private readonly location: Location, private  readonly httpService: HttpDashboardServiceService, private readonly store: LoadingStore,) {

    this.recordatorioStoreSubscription = this.dataStore.currentRecordatorio.subscribe(recordatorios => {
      this.recordatoriosResponse = recordatorios
    })

    this.recordatorioUseCase = new RecordatorioUseCase(httpService);

  }



  ngOnDestroy(): void {
    this.recordatorioStoreSubscription?.unsubscribe();

  }

  DeleteRecordatorio(id: number) {
    this.store.loadingOn();
    this.recordatorioUseCase.ExecuteDelete(id)
      .subscribe({
        next: (value) => {
          this.store.loadingOff();
          this.router.navigate(['/recordatorio', { reload: Date.now() }])
            .then(() => {
              // Navega de nuevo a la ruta sin el parámetro
              this.router.navigate(['/recordatorio']);
            });
        }, error: (err) => {
          this.store.loadingOff();

        }
      })
  }


  updateEstado(id: number, estado: boolean) {
    this.store.loadingOn();
    let request = {} as RecordatorioRequest;
    request.estado = !estado;
    request.id = id

    this.recordatorioUseCase.ExecuteUpdate(request).subscribe({
      next: (value) => {
        this.store.loadingOff();
        const navigationExtras: NavigationExtras = {
          replaceUrl: true // Simula una nueva navegación
        };
        this.router.navigate(['/recordatorio'], navigationExtras);
      }, error: (err) => {
        this.store.loadingOff();
      }
    })
  }


  UpdateCkeckRecordatorio(id: number) {
    this.store.loadingOn();

    let request = {} as RecordatorioRequest;
    request.checkRecordatorio = true;
    request.id = id

    this.recordatorioUseCase.ExecuteUpdate(request).subscribe({
      next: (value) => {
        this.store.loadingOff();
        const navigationExtras: NavigationExtras = {
          replaceUrl: true // Simula una nueva navegación
        };
        this.router.navigate(['/recordatorio'], navigationExtras);

      }, error: (err) => {
        this.store.loadingOff();

      }
    })
  }


  RedirectCreate(){
    this.router.navigateByUrl('/recordatorio/registrar');
  }

}
