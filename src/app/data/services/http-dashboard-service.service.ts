import { Injectable } from '@angular/core';
import { DashboarService } from '../../core/service/dashboard-service';
import { Observable } from 'rxjs';
import { BasResponse } from '../../core/domain/models/response/baseResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListRecordatoriosResponse } from '../../core/domain/models/response/recordatoriosResponse';
import { RecordatorioCreateRequest, RecordatorioRequest } from '../../core/domain/models/request/recordatorioRequest';

@Injectable({
  providedIn: 'root'
})
export class HttpDashboardServiceService implements DashboarService {

  constructor(private readonly httpclient: HttpClient) { }


  urlBase: string = "http://localhost:8081/api/v1";


  GetHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  GetRecordatoriosByIdUsuario(idUsuario: number | undefined): Observable<ListRecordatoriosResponse> {
    let headers = this.GetHeaders()
    return this.httpclient.get<ListRecordatoriosResponse>(this.urlBase + `/recordatorio/getrecordatoriosbyid/${idUsuario}`, { headers });
  }

  DeleteRecordatorio(id: number | undefined): Observable<BasResponse> {
    return this.httpclient.delete<BasResponse>(this.urlBase + `/recordatorio/delete/${id}`);
  }


  UpdateRecordatorio(request: RecordatorioRequest): Observable<BasResponse> {
    let headers = this.GetHeaders()
    return this.httpclient.patch<BasResponse>(this.urlBase + '/recordatorio/patchrecordatorio', request);
  }

  CreateRecordatorio(request: RecordatorioCreateRequest): Observable<BasResponse> {
    return this.httpclient.post<BasResponse>(this.urlBase + '/recordatorio/create', request);
  }



}
