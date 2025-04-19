import { UserService } from "../../../service/user-service";
import { UsuarioRequest } from "../../models/request/usuarioRequest";



export class RegisteUseUseCase {


  constructor(private readonly service: UserService) {
  }

  Execute(request: UsuarioRequest){
    request.Password =  btoa(request.Password);
    return this.service.registro(request);
  }

}
