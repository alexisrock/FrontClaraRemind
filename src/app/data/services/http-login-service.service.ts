import { Injectable } from '@angular/core';
import { LoginService } from '../../core/service/login-service';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../core/domain/models/request/loginRequest';
import { LoginResponse } from '../../core/domain/models/response/loginResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListRecordatoriosResponse } from '../../core/domain/models/response/recordatoriosResponse';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginServiceService implements LoginService {

  constructor(private readonly httpclient: HttpClient) { }

  urlBase: string = "http://localhost:8081/api/v1";

  loginUsuario(request: LoginRequest): Observable<LoginResponse> {
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json'    });

    return this.httpclient.post<LoginResponse>(this.urlBase + '/login/create', request, { headers });
  }


  GetRecordatoriosByIdUsuario(idUsuario: number|undefined):Observable<ListRecordatoriosResponse> {
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json'    });

    return this.httpclient.get<ListRecordatoriosResponse>(this.urlBase + `/recordatorio/getrecordatoriosbyid/${idUsuario}`,   { headers });
  }



}
