import { Observable } from "rxjs";
import { LoginRequest } from "../domain/models/request/loginRequest";
import { LoginResponse } from "../domain/models/response/loginResponse";
import { ListRecordatoriosResponse } from "../domain/models/response/recordatoriosResponse";

export abstract class LoginService {
  abstract loginUsuario(request: LoginRequest): Observable<LoginResponse>;
  abstract GetRecordatoriosByIdUsuario(idUsuario: number|undefined):Observable<ListRecordatoriosResponse>;

}
