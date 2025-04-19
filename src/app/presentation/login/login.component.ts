import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IconinicioComponent } from "../shared/iconinicio/iconinicio.component";
import { LoginUseCase } from '../../core/domain/usecases/login/login-use-case';
import { HttpLoginServiceService } from '../../data/services/http-login-service.service';
import { LoadingStore } from '../../data/stores/loading.store';
import { LoaddingComponent } from '../shared/loadding/loadding.component';
import { LoginRequest } from '../../core/domain/models/request/loginRequest';
import { AuthService } from '../../core/guards/auth.guard';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IconinicioComponent, LoaddingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  fg!: FormGroup;
  loading: boolean = false;
  message: string = ""
  private readonly loginUseCase: LoginUseCase

  constructor(private readonly loginService: HttpLoginServiceService, private readonly store: LoadingStore, public router: Router, private readonly auth: AuthService) {
    this.InitialComponents();
    this.loginUseCase = new LoginUseCase(loginService);
  }


  InitialComponents(){
    this.fg = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required])
    })

  }

  SendForm(){
    if (this.fg.valid) {
      this.store.loadingOn();
      let request = {} as LoginRequest;
      request.email = this.fg.get('Email')?.value;
      request.password = this.fg.get('Password')?.value;
      this.loginUseCase.Execute(request)
      .subscribe({
        next: (value) => {
          this.store.loadingOff();
          this.auth.setCoockies(value);
          this.router.navigateByUrl('recordatorio');
        },error: (err) => {
          this.store.loadingOff();
          this.showMessage(err.message)
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
