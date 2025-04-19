export type ListRecordatoriosResponse = RecordatoriosResponse[]

export interface RecordatoriosResponse {
  id: number
  descripcion: string
  fechaRegistro: string
  hora: string
  checkRecordatorio: boolean
  esRecurente: boolean
  estado: boolean
  idUsuario: number
}
