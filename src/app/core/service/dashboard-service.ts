import { Observable } from "rxjs";
import { BasResponse } from "../domain/models/response/baseResponse";
import { ListRecordatoriosResponse } from "../domain/models/response/recordatoriosResponse";
import { RecordatorioCreateRequest, RecordatorioRequest } from "../domain/models/request/recordatorioRequest";

export abstract class DashboarService {

  abstract GetRecordatoriosByIdUsuario(idUsuario: number|undefined):Observable<ListRecordatoriosResponse>;
  abstract DeleteRecordatorio(id:  number|undefined): Observable<BasResponse>;
  abstract UpdateRecordatorio(request: RecordatorioRequest): Observable<BasResponse>;
  abstract CreateRecordatorio(request: RecordatorioCreateRequest): Observable<BasResponse>;
}
