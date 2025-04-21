import { DashboarService } from "../../../service/dashboard-service";
import { RecordatorioCreateRequest, RecordatorioRequest } from "../../models/request/recordatorioRequest";


export class RecordatorioUseCase {

    constructor(private readonly service: DashboarService) {

    }


    ExecuteList(idUsuario: number|undefined){
      return this.service.GetRecordatoriosByIdUsuario(idUsuario);
    }

    ExecuteDelete(id: number|undefined){
      return this.service.DeleteRecordatorio(id);
    }

    ExecuteUpdate(request: RecordatorioRequest){
      return this.service.UpdateRecordatorio(request);
    }

    ExecuteCreate(request: RecordatorioCreateRequest){
      return this.service.CreateRecordatorio(request);
    }

}
