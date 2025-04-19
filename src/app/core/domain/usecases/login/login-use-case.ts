import { LoginService } from "../../../service/login-service";
import { LoginRequest } from "../../models/request/loginRequest";

export class LoginUseCase {


  constructor(private readonly loginService: LoginService) {

  }


  Execute(request: LoginRequest){
    request.password = btoa(request.password);
    return this.loginService.loginUsuario(request);
  }

}
