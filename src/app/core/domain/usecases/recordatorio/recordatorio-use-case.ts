import { LoginService } from "../../../service/login-service";

export class RecordatorioUseCase {

    constructor(private readonly loginService: LoginService) {

    }


    ExecuteList(idUsuario: number|undefined){
      return this.loginService.GetRecordatoriosByIdUsuario(idUsuario);
    }

}
