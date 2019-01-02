import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-donuts',
  templateUrl: './grafico-donuts.component.html',
  styleUrls: ['./grafico-donuts.component.css']
})
export class GraficoDonutsComponent implements OnInit {

  @Input() doughnutChartLabels: string[] = ['Con Frijoles', 'Con Natilla', 'Con tocino'];
  @Input() doughnutChartData: number[] = [24, 30, 46];
  @Input() doughnutChartType: string = 'doughnut';
  @Input() leyenda: string = 'Leyenda';

  constructor() {
   }

  ngOnInit() {
  }

}
