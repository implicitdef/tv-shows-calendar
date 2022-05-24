import { Moment } from "moment";

export type Show = {
  id: number;
  name: string;
};

export type ShowAndSeasons = {
  serie: Show;
  seasons: Season[];
};

export type SeasonWithShow = {
  show: Show;
  number: string;
  time: TimeRange;
};

export type Season = {
  number: string;
  time: TimeRange;
};

export type TimeRange = {
  start: string;
  end: string;
};

export type DataFromDb = ShowAndSeasons[];
