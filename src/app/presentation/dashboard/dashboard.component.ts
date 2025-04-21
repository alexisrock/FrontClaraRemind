import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/guards/auth.guard';
import { DataStore } from '../../data/stores/data.store';
import { RecordatorioUseCase } from '../../core/domain/usecases/recordatorio/recordatorio-use-case';
import { HttpDashboardServiceService } from '../../data/services/http-dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private readonly recordatorioUseCase: RecordatorioUseCase;
  constructor(public router: Router, private readonly auth: AuthService, private readonly store: DataStore, private readonly httpService: HttpDashboardServiceService) {
    this.recordatorioUseCase = new RecordatorioUseCase(httpService);
    this.GetRecordatoriosById();
  }

  GetRecordatoriosById() {
    let idUsuario: number | undefined = this.auth.getCookies()?.idUsuario;
    this.recordatorioUseCase.ExecuteList(idUsuario)
      .subscribe({
        next: (value) => {
          this.store.setCurrentTareas(value);
        }, error: (err) => {
          this.store.setCurrentTareas([]);
        },
      })
  }

  CerrarSession() {
    this.auth.clearAll();
    this.router.navigateByUrl('');
  }

}
