import { Injectable } from '@angular/core';

@Injectable()
export class RutasService {
  public rutaFotosUsuarios: string = "https://tp2017utn.000webhostapp.com/fotosUsuarios/";
  public rutaAPI: string = "https://tp2017utn.000webhostapp.com/api/index.php/";
  public rutaFotosRelevamientos: string = "https://tp2017utn.000webhostapp.com/fotosRelevamientos/";
  //public rutaFotosUsuarios: string = "http://localhost/fotosUsuarios/";
  //public rutaFotosRelevamientos: string = "http://localhost/fotosRelevamientos/";
  //public rutaAPI: string = "http://localhost/index.php/";
  public rutaImagenesSitio: string = "assets/";
}