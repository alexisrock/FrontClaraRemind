import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaddingComponent } from '../../shared/loadding/loadding.component';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordatorioUseCase } from '../../../core/domain/usecases/recordatorio/recordatorio-use-case';
import { HttpDashboardServiceService } from '../../../data/services/http-dashboard-service.service';
import { RecordatorioCreateRequest } from '../../../core/domain/models/request/recordatorioRequest';
import { LoadingStore } from '../../../data/stores/loading.store';
import { AuthService } from '../../../core/guards/auth.guard';

@Component({
  selector: 'app-create-recordatorio',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoaddingComponent],
  templateUrl: './create-recordatorio.component.html',
  styleUrl: './create-recordatorio.component.scss'
})
export class CreateRecordatorioComponent {

  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""
  private readonly recordatorioUseCase: RecordatorioUseCase;
  /**
   *
   */
  constructor(public router: Router, private readonly auth: AuthService, private readonly httpService: HttpDashboardServiceService, private readonly store: LoadingStore) {
    this.InitialComponents();
    this.recordatorioUseCase = new RecordatorioUseCase(httpService);
  }

  InitialComponents() {
    this.fg = new FormGroup({
      Descripcion: new FormControl('', [Validators.required]),
      Fecharegistro: new FormControl('', [Validators.required]),
      Hora: new FormControl('', [Validators.required]),
      Esrecurente: new FormControl('',)
    })
  }




  SendForm() {
    if (this.fg.valid) {
      let request = {} as RecordatorioCreateRequest;
      request.descripcion = this.fg.get('Descripcion')?.value
      request.fechaRegistro = this.fg.get('Fecharegistro')?.value
      request.hora = this.fg.get('Hora')?.value + ":00"
      request.checkRecordatorio = false;
      request.esRecurente = this.fg.get('Esrecurente')?.value
      request.estado = true;
      let idUsuario: number | undefined = this.auth.getCookies()?.idUsuario;
      request.idUsuario = idUsuario;
      this.recordatorioUseCase.ExecuteCreate(request).subscribe({
        next: (value) => {
          this.store.loadingOff();
          this.showMessage(value.message)
          this.fg.reset();
        }, error: (err) => {
          this.store.loadingOff();
          this.showMessage(err.message)
        }
      })

    }
  }


  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)
  }


  RedirectCreate() {
    this.router.navigate(['/recordatorio', { reload: Date.now() }])
      .then(() => {
        // Navega de nuevo a la ruta sin el parámetro
        this.router.navigate(['/recordatorio']);
      });
  }

}
