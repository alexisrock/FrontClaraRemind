import { Injectable } from '@angular/core';
import { UserService } from '../../core/service/user-service';
import { UsuarioRequest } from '../../core/domain/models/request/usuarioRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BasResponse  } from "../../core/domain/models/response/baseResponse";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HttpUserServiceService implements UserService {

  constructor(private readonly httpclient: HttpClient) { }

  urlBase: string = "http://localhost:7296/";



  registro(request: UsuarioRequest):Observable<BasResponse>  {
    let  headers = new HttpHeaders({
      'Content-Type': 'application/json'    });

    return this.httpclient.post<BasResponse>(this.urlBase + 'api/FnRegistroUsuario', request, { headers });
  }




}
