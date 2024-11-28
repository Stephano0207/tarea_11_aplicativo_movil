import { Chart } from 'chart.js/auto';
import { Component } from '@angular/core';
import { VentaService } from '../services/ventas/venta.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private serviceVenta:VentaService) {}

  ventas: { MES: string; MONTO: number }[] = []; // Array para los datos de la tabla
  fechaInicio: string = '';
  fechaFin: string = '';
  chart: any;

  obtenerVentas() {
    if (this.fechaInicio && this.fechaFin) {
      this.serviceVenta.reporte(this.fechaInicio, this.fechaFin).subscribe((data: any) => {
        this.ventas = data.response; // Alm
        console.log(this.fechaFin,this.fechaInicio);
        console.log(data.response);
        const meses = data.response.map((venta: any) => venta.MES);
        const montos = data.response.map((venta: any) => venta.MONTO);
        console.log(meses, montos )

        this.renderizarGrafico(meses, montos);
      });
    }
  }
  renderizarGrafico(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy(); // Destruir el gráfico anterior si existe
    }

    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar', // Cambia a 'line' si prefieres un gráfico de líneas
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ventas por mes',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

}
