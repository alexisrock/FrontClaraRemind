import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RecordatoriosResponse } from "../../core/domain/models/response/recordatoriosResponse";

@Injectable({ providedIn: 'root' })
export class DataStore {




  private readonly currentRecordatorioSubject: BehaviorSubject<RecordatoriosResponse[]> = new BehaviorSubject({} as RecordatoriosResponse[]);
  public readonly currentRecordatorio: Observable<RecordatoriosResponse[]> = this.currentRecordatorioSubject.asObservable();



  setCurrentTareas(recordatoriosCurrent: RecordatoriosResponse[]): void {
    this.currentRecordatorioSubject.next(recordatoriosCurrent);
  }



}
