import { Moment } from 'moment'

type TimesType = string | Moment

export type Show = {
  id: number
  name: string
}
export type ShowAndSeasons = {
  serie: Show
  seasons: Season<string>[]
}
export type SeasonWithShow = {
  show: Show
  number: string
  time: TimeRange<Moment>
}
export type Season<T extends TimesType = Moment> = {
  number: string
  time: TimeRange<T>
}
export type TimeRange<T extends TimesType = Moment> = {
  start: T
  end: T
}
export type DataFromDb = Array<ShowAndSeasons>
