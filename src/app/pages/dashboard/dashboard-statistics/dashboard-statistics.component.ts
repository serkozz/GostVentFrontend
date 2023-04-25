import { StatisticsService } from './../../../services/statistics.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { ErrorInfo } from 'src/app/types/errorInfo';
import { StatisticsReport } from 'src/app/types/statisticsReport';
import {
  formatDate,
  getRandomColor,
  getStatisticsDataNames,
  getStatisticsDataValues,
} from 'src/app/types/utilityFuncs';

//@ts-ignore
// import { debounce } from "debounce";

Chart.register(...registerables);
Chart.defaults.backgroundColor = '#3A5169';
Chart.defaults.borderColor = '#1D2A36';
Chart.defaults.color = '#FFFFFF';

@Component({
  selector: 'dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.scss'],
})
export class DashboardStatisticsComponent implements OnInit {
  @Input() role: 'Admin' | 'User' = 'User';
  @Input() email: string = '';

  today!: string;
  from!: string;

  fromInput!: HTMLInputElement;
  toInput!: HTMLInputElement;

  fromStatistics!: StatisticsReport[];
  toStatistics!: StatisticsReport[];

  canvases!: HTMLCollectionOf<HTMLCanvasElement>;
  charts: Chart[] = [];

  constructor(
    private statisticsService: StatisticsService,
    private toastr: ToastrService
  ) {}

  // debounce(func: any, time: number) {
  //   var time = time || 100; // 100 by default if no param
  //   let timer: any;
  //   return function (event: any) {
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(func, time, event);
  //   };
  // }

  // // Function with stuff to execute
  // resizeContent() {
  //   // Do loads of stuff once window has resized
  //   console.log('resized');
  // }

  ngOnInit(): void {
    // window.onresize = this.debounce(this.recreate, 1000);

    this.today = formatDate(new Date());
    this.from = this.today;
    this.fromInput = document.getElementById('from') as HTMLInputElement;
    this.toInput = document.getElementById('to') as HTMLInputElement;
    this.fromInput.value = this.today
    this.toInput.value = this.today
    // this.getStatisticsByDate(new Date(this.fromInput.value));
    this.getStatisticsByDateV2(new Date(this.fromInput.value), 'from');
    this.getStatisticsByDateV2(new Date(this.toInput.value), 'to');
    this.canvases = document.getElementsByTagName('canvas');

    setTimeout(() => {
      this.createCharts();
    }, 500);

    console.log(`Today is: ${this.today}`);
  }

  recreate() {
    this.getStatisticsByDateV2(new Date(this.fromInput.value), 'from');
    this.getStatisticsByDateV2(new Date(this.toInput.value), 'to');
    this.canvases.item(0);
    setTimeout(() => {
      this.createCharts();
    }, 500);
  }

  onDateChanged() {
    this.from = this.fromInput.value;
    if (!this.fromInput.value) this.toInput.value = this.fromInput.value;
    if (!this.toInput.value) this.toInput.value = this.fromInput.value;
    if (new Date(this.toInput.value) < new Date(this.fromInput.value)) {
      this.toInput.value = this.fromInput.value;
    }

    if (
      this.fromInput.value == this.toInput.value &&
      this.fromInput.value &&
      this.toInput.value
    ) {
      this.recreate();
    } else if (
      this.fromInput.value != this.toInput.value &&
      this.fromInput.value &&
      this.toInput.value
    ) {
      this.recreate();
    }
  }

  createCharts() {
    this.charts = [];
    this.fromStatistics.forEach((stat, ind, arr) => {
      let cfg = {
        type: 'bar',
        data: {
          datasets: [
            {
              label: `Значение ${this.fromInput.value}`,
              data: getStatisticsDataValues(stat.data),
              backgroundColor: getRandomColor(),
            },
            {
              label: `Значение ${this.toInput.value}`,
              data: getStatisticsDataValues(this.toStatistics[ind].data),
              backgroundColor: getRandomColor(),
            },
          ],
          labels: getStatisticsDataNames(stat.data),
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: stat.name,
            },
          },
        },
      };

      // @ts-ignore
      let chart = new Chart(this.canvases.item(ind), cfg);
      this.charts.push(chart);
      console.log(this.charts);
    });
  }

  getStatisticsByDateV2(date: Date, whatStatisticsToFill: 'from' | 'to') {
    console.log('getStatisticsByDate invoked');

    this.statisticsService.getStatisticsByDate(date).subscribe({
      next: (statistics: StatisticsReport[]) => {
        if (whatStatisticsToFill == 'from') {
          this.fromStatistics = statistics;
          console.log('FromStatistics');
          console.log(this.fromStatistics);
        } else if (whatStatisticsToFill == 'to') {
          this.toStatistics = statistics;
          console.log('ToStatistics');
          console.log(this.toStatistics);
        }
      },
      error: (error: ErrorInfo) => {
        this.toastr.error(error.message, 'Ошибка');
      },
    });
  }

  createStatistics() {
    this.statisticsService.updateStatistics(new Date()).subscribe({
      next: (statistics: StatisticsReport[]) => {
        this.toastr.success('Статистика на сегодня составлена', 'Успех');
      },
      error: (errors: ErrorInfo[]) => {
        errors.forEach((error) => {
          this.toastr.error(error.message, 'Ошибка');
        });
      },
    });
  }
}
