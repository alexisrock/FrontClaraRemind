import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecordatorioComponent } from './create-recordatorio/create-recordatorio.component';
import { ListrecordatoriosComponent } from './listrecordatorios/listrecordatorios.component';

export const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: ListrecordatoriosComponent},
      { path: 'registrar', component: CreateRecordatorioComponent},
    ]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
