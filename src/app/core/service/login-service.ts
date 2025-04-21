import { Observable } from "rxjs";
import { LoginRequest } from "../domain/models/request/loginRequest";
import { LoginResponse } from "../domain/models/response/loginResponse";


export abstract class LoginService {
  abstract loginUsuario(request: LoginRequest): Observable<LoginResponse>;


}
