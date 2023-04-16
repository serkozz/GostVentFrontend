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