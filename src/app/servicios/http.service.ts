import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
  
  constructor(public http: Http, public Router: Router) { }

  leer(ruta, id){
    return this.http.get(ruta + id, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato.bind(this))
    .catch(this.manejarError);
  }

  leerTodos(ruta){
    return this.http.get(ruta + 'leerTodos', new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  post(ruta, cuerpo){
    return this.http.post(ruta, cuerpo, new RequestOptions({ headers: new Headers({ "token": JSON.parse(localStorage.getItem('token'))})}))
    .toPromise()
    .then(this.extraerDato)
    .catch(this.manejarError);
  }

  login(ruta, cuerpo){
    return this.http.post(ruta, cuerpo)
    .toPromise()
    .then(data => {
      return [data.json(), data.headers.get('token')];
    })
    .catch(this.manejarError);
  }

  manejarError(error: Response | any){
    console.log(error);
  }

  extraerDato(respuesta){
    return respuesta.json() || {};
  }
}