import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';

import { RutasService } from '../../servicios/rutas.service';
import { ActualizacionusuarioService } from '../../servicios/actualizacionusuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  rutaAPI: string = this.RutasService.rutaAPI + "consultaUsuarios/login";
  mensajeError: boolean;
  spinner: boolean;

  constructor(
  private formBuilder:FormBuilder,
  public HttpService: HttpService,
  private router: Router,
  public actualizacionusuarioService: ActualizacionusuarioService,
  public RutasService: RutasService) {
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    localStorage.clear();
    this.mensajeError = null;
  }

  login(){
    var formData = new FormData();
    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);
    this.spinner = true;
    this.HttpService.login(this.rutaAPI, formData)
    .then(datos => {
      this.spinner = false;
      if(datos[0].error == 'Usuario inexistente'){
        this.mensajeError = true;
      }
      else{
        localStorage.setItem('usuarioActual', JSON.stringify(datos[0]));
        localStorage.setItem('token', JSON.stringify(datos[1]));
        this.actualizacionusuarioService.actualizarObservable();
        this.router.navigate(['inicial']);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  autocompletar(perfil : string) : void{
    switch (perfil) {
      case "encargado":
        this.loginForm.controls['email'].setValue("elias.rod@live.com");
        this.loginForm.controls['password'].setValue("a");
        break;
      case "empleado":
        this.loginForm.controls['email'].setValue("theone@matrix.com");
        this.loginForm.controls['password'].setValue("101");
        break;
      case "cliente":
        this.loginForm.controls['email'].setValue("susana.gim@telefe.com");
        this.loginForm.controls['password'].setValue("a");
        break;
    }
  }
}