import { StatisticsService } from './../../../services/statistics.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from 'src/app/types/utilityFuncs';

Chart.register(...registerables)
Chart.defaults.backgroundColor = '#3A5169'
Chart.defaults.borderColor = '#1D2A36'
Chart.defaults.color = '#FFFFFF'

@Component({
  selector: 'dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.scss'],
})
export class DashboardStatisticsComponent implements OnInit {
  @Input() role: 'Admin' | 'User' = 'User';
  @Input() email: string = '';
  today!: string
  from!: string
  fromInput!: HTMLInputElement
  toInput!: HTMLInputElement

  statistics: string[] = ['Max', 'Min', 'Mean'];

  // statisticsQuery: string[] = [
  //   // 'Максимальные сумма заказа у одного клиента',
  //   '--- Средняя сумма заказа',
  //   '--- Средняя сумма по категориям',
  //   '--- Среднее время выполнения заказа по категориям',
  //   '--- Процент заказов среди всех по категориям',
  //   // 'Среднее число заказов по типу в месяц', ВЫЧИСЛЯЕТСЯ ИЗ ПРОШЛОГО НА ФРОНТЕ
  //   '--- Средняя оценка заказа в баллах',
  //   'Средняя выручка в месяц',
  //   'Средний объем файлов заказов у одного клиента',
  //   'Среднее число посещений за день (месяц, год)',
  // ];

  constructor(private statisticsService: StatisticsService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createTestChart()
    this.today = formatDate(new Date())
    this.from = this.today
    this.fromInput = document.getElementById('from') as HTMLInputElement
    this.toInput = document.getElementById('to') as HTMLInputElement
    console.log(`Today is: ${this.today}`);
  }

  onDateChanged() {
    this.from = this.fromInput.value
    if (!this.fromInput.value)
      this.toInput.value = this.fromInput.value
    if (!this.toInput.value)
      this.toInput.value = this.fromInput.value
    if (new Date(this.toInput.value) < new Date(this.fromInput.value))
    {
      this.toInput.value = this.fromInput.value
    }

    if (this.fromInput.value == this.toInput.value && this.fromInput.value && this.toInput.value)
      this.getStatisticsByDate(new Date(this.fromInput.value))
    else if (this.fromInput.value != this.toInput.value && this.fromInput.value && this.toInput.value)
      this.getStatisticsByDateRange(new Date(this.fromInput.value), new Date(this.toInput.value))
  }

  createTestChart() {
    let ctx = document.getElementById('test-chart') as HTMLCanvasElement
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        font: {
          family: 'Roboto',
          size: 12,
          style: 'italic',
        },
        plugins: {
          colors: {
            enabled: true
          },
          legend: {
            align: 'center',
            display: true,
          },
          title: {
            align: 'center',
            color: 'White',
            display: true,
            position: 'top',
            text: "Title"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    console.log(chart);
  }

  statisticsSelectorChanged(event: Event) {}

  getStatisticsByDate(date: Date) {
    console.log("getStatisticsByDate invoked");

    this.statisticsService.getStatisticsByDate(date);
  }

  getStatisticsByDateRange(from: Date, to: Date) {
    console.log("getStatisticsByDateRange invoked");
    this.statisticsService.getStatisticsByDateRange(from, to);
  }

  updateStatistics() {}
}
