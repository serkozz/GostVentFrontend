import { StatisticsData } from "./statisticsReport";

export let dayTextForms: string[] = ['день', 'дня', 'дней']

export function declNum(number: number, textForms: string[]): string {
    let n = Math.abs(number) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return textForms[2]; }
    if (n1 > 1 && n1 < 5) { return textForms[1]; }
    if (n1 == 1) { return textForms[0]; }
    return textForms[2];
}

export function declDate(date: string | Date | undefined): string {
  const months = 'янв.,фев.,мар.,апр.,май,июн.,июл.,авг.,сен.,окт.,ноя.,дек.'.split(',');
  let parsedDate: Date

  if (typeof date == 'undefined')
    return 'undefined'

  if (typeof date == 'string')
    parsedDate = new Date(Date.parse(date))
  else
    parsedDate = date

  return `${parsedDate.getDate()} ${months[parsedDate.getMonth()]} ${parsedDate.getFullYear()}`
}

export function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

export function getStatisticsDataNames(statisticsDataArray: StatisticsData[]): string[] {
  let names: string[] = []
  statisticsDataArray.forEach((val, id, arr) => {
    names.push(val.name)
  })
  return names
}

export function getStatisticsDataValues(statisticsDataArray: StatisticsData[]): number[] {
  let values: number[] = []
  statisticsDataArray.forEach((val, id, arr) => {
    values.push(val.value)
  })
  return values
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}