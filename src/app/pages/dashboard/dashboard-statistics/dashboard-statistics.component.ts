import { StatisticsService } from './../../../services/statistics.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-statistics',
  templateUrl: './dashboard-statistics.component.html',
  styleUrls: ['./dashboard-statistics.component.scss']
})
export class DashboardStatisticsComponent {
  @Input() role: 'Admin' | 'User' = 'User'
  @Input() email: string = ''

  statistics: string[] = [
    'Max',
    'Min',
    'Mean'
  ]

  statisticsQuery: string[] = [
    // 'Максимальные сумма заказа у одного клиента',
    'Средняя сумма заказа у одного клиента',
    'Среднее время выполнения заказа',
    'Средний чек на определенную категорию товара',
    'Среднее число заказов по типу в месяц',
    'Средняя оценка заказа в баллах',
    'Средняя выручка в месяц',
    'Средний объем файлов заказов у одного клиента',
    'Среднее число посещений за день (месяц, год)'
  ]

  constructor(private statisticsService: StatisticsService) {

  }
  statisticsSelectorChanged(event: Event) {

  }

  getStatistics() {
    this.statisticsService.getStatistics()
  }

  updateStatistics() {

  }

}
