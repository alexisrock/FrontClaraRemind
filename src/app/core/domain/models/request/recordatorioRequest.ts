export interface RecordatorioRequest {
  id: number
  descripcion: string
  fechaRegistro: string
  hora: string
  checkRecordatorio: boolean
  esRecurente: boolean
  estado: boolean
  idUsuario: number
}



  export interface RecordatorioCreateRequest {
    descripcion: string
    fechaRegistro: string
    hora: string
    checkRecordatorio: boolean
    esRecurente: boolean
    estado: boolean
    idUsuario: number | undefined
  }
