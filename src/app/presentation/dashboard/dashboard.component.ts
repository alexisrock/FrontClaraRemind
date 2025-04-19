import { HttpLoginServiceService } from './../../data/services/http-login-service.service';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/guards/auth.guard';
import { DataStore } from '../../data/stores/data.store';
import { RecordatorioUseCase } from '../../core/domain/usecases/recordatorio/recordatorio-use-case';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

private recordatorioUseCase: RecordatorioUseCase;
  constructor(public router: Router, private readonly auth: AuthService, private store: DataStore, private httpLoginServiceService: HttpLoginServiceService) {

    this.recordatorioUseCase= new RecordatorioUseCase(httpLoginServiceService);
    this.GetRecordatoriosById();
  }

  GetRecordatoriosById(){
    let idUsuario: number|undefined = this.auth.getCookies()?.idUsuario;
    this.recordatorioUseCase.ExecuteList(idUsuario)
    .subscribe({
      next: (value)=> {
          this.store.setCurrentTareas(value);
      },error: (err)=> {
        this.store.setCurrentTareas([]);
      },
    })
  }



  CerrarSession(){
    this.auth.clearAll();
    this.router.navigateByUrl('');
  }

}
