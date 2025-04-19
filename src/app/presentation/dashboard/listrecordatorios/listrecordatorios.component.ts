import { Component, OnDestroy } from '@angular/core';
import { RecordatoriosResponse } from '../../../core/domain/models/response/recordatoriosResponse';
import { CommonModule, NgFor } from '@angular/common';
import { DataStore } from '../../../data/stores/data.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listrecordatorios',
  imports: [NgFor, CommonModule],
  templateUrl: './listrecordatorios.component.html',
  styleUrl: './listrecordatorios.component.scss'
})
export class ListrecordatoriosComponent implements OnDestroy{

  recordatoriosResponse : RecordatoriosResponse[] = []

  private readonly recordatorioStoreSubscription: Subscription | undefined;

  constructor(private readonly dataStore: DataStore) {

   this.recordatorioStoreSubscription = this.dataStore.currentRecordatorio.subscribe(  recordatorios=>{
    this.recordatoriosResponse = recordatorios
  })


  }



  ngOnDestroy(): void {
    this.recordatorioStoreSubscription?.unsubscribe();

  }

}
