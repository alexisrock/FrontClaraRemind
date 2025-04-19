import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconinicioComponent } from "../shared/iconinicio/iconinicio.component";
import { UsuarioRequest } from '../../core/domain/models/request/usuarioRequest';
import { matchPasswordValidator } from '../../shared/passvalidators';
import { RegisteUseUseCase } from '../../core/domain/usecases/usuario/registeUseUseCase';
import { HttpUserServiceService } from '../../data/services/http-user-service.service';
import { LoaddingComponent } from "../shared/loadding/loadding.component";
import { LoadingStore } from '../../data/stores/loading.store';



@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IconinicioComponent, LoaddingComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""
 ; private readonly registeUseUseCase: RegisteUseUseCase

  constructor(private readonly service: HttpUserServiceService, private readonly store: LoadingStore) {
    this.InitialComponents();

    this.registeUseUseCase = new RegisteUseUseCase(service);
  }


  InitialComponents() {
    this.fg = new FormGroup({
      Nombres: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Telefono: new FormControl('', [Validators.maxLength(10)]),
      Password: new FormControl('', [Validators.required]),
      Passwordconfirm: new FormControl('', [Validators.required])

    }, {
      validators: matchPasswordValidator('Password', 'Passwordconfirm')
    })
  }

  SendForm() {
    if (this.fg.valid) {
      this.store.loadingOn();
      let request = {} as UsuarioRequest;
      request.Email = this.fg.get('Email')?.value;
      request.Name = this.fg.get('Nombres')?.value;
      request.CelPhoneNumber = this.fg.get('Telefono')?.value;
      request.Password = this.fg.get('Password')?.value;
      this.registeUseUseCase.Execute(request)
        .subscribe({
          next: (value) => {
            this.showMessage(value.message)
            this.store.loadingOff();
            this.fg.reset();

          }, error: (err) => {

          }
        })
    }
  }


  showMessage(mensaje: string) {
    this.loading = true
    this.message = mensaje;
    setTimeout(() => { this.message = ""; this.loading = false }, 6000)

  }
}
