import { Observable } from "rxjs";
import { UsuarioRequest } from "../domain/models/request/usuarioRequest";
import { BasResponse  } from "../domain/models/response/baseResponse";

export abstract class UserService {


  abstract registro(request: UsuarioRequest): Observable<BasResponse>;

}
