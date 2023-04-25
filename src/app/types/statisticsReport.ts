export interface StatisticsReport {
  name: string,
  creationDate: Date,
  data: StatisticsData[]
  isDataSingle: boolean
}

export interface StatisticsData {
  name: string,
  value: number
}