import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../servicios/http.service';
import { RutasService } from '../../servicios/rutas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  spinner: boolean;
  encuestas: Array<any>;
  mostrarGraficos: boolean = false;
  constructor(
    public HttpService: HttpService,
    public RutasService: RutasService) {
      this.leerTodos();
    }

  ngOnInit() {
  }
  // Pie
  public pieChartLabels:string[] = ['Si', 'No'];
  public pieChartData:number[];
  public pieChartData2:number[];
  public pieChartData3:number[];
  public pieChartType:string = 'pie';

  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartLabels:string[] = ['Satisfaccion global', 'Satisfaccion con MS', 'Satisfaccion notas', 'Satisfaccion fotos'];
  public barChartData:any[];

  leerTodos(){
    this.spinner = true;
    this.HttpService.leerTodos(this.RutasService.rutaAPI + "consultaEncuestas/")
    .then(datos => {
      this.spinner = false;
      this.encuestas = datos;

      this.barChartData = [
        {data: [this.contarBMM('satisfaccionGlobal')[0], this.contarBMM('satisfaccionMShopper')[0], this.contarBMM('satisfaccionNotas')[0], this.contarBMM('satisfaccionFotos')[0]], label: 'Bueno'},
        {data: [this.contarBMM('satisfaccionGlobal')[1], this.contarBMM('satisfaccionMShopper')[1], this.contarBMM('satisfaccionNotas')[1], this.contarBMM('satisfaccionFotos')[1]], label: 'Medio'},
        {data: [this.contarBMM('satisfaccionGlobal')[2], this.contarBMM('satisfaccionMShopper')[2], this.contarBMM('satisfaccionNotas')[2], this.contarBMM('satisfaccionFotos')[2]], label: 'Malo'}
      ];

      this.pieChartData = [this.contarSiNo('recomendariaServicio')[0], this.contarSiNo('recomendariaServicio')[1]];
      this.pieChartData2 = [this.contarSiNo('recomendariaMShopper')[0], this.contarSiNo('recomendariaMShopper')[1]];
      this.pieChartData3 = [this.contarSiNo('concuerdaPuntajePromedio')[0], this.contarSiNo('concuerdaPuntajePromedio')[1]];
      
      this.mostrarGraficos = true;
    })
    .catch(error => {
      console.log(error);
    });
  }

  contarBMM(pregunta){
    let buenos = 0;
    let medios = 0;
    let malos = 0;
    for (let index = 0; index < this.encuestas.length; index++) {
      if(this.encuestas[index][pregunta] == 'bueno'){
        buenos++;
      }
      else if(this.encuestas[index][pregunta] == 'medio'){
        medios++;
      }
      else{
        malos++;
      }
    }
    return [buenos, medios, malos];
  }
  
  contarSiNo(pregunta){
    let sies = 0;
    let noes = 0;
    for (let index = 0; index < this.encuestas.length; index++) {
      if(this.encuestas[index][pregunta] == 'si'){
        sies++;
      }
      else{
        noes++;
      }
    }
    return [sies, noes];
  }
}
