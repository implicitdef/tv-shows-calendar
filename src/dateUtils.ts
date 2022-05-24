import moment, { Moment } from "moment";
import { TimeRange } from "./structs";

export const range0_11 = Array.from(Array(12).keys());

// date : a momentjs object
// returns the offset in percentage
// of that date along the year
// (i.e. how far away from January 1st)
export function dateLeftOffset(date: string): number {
  const startOfYear = moment(date).startOf("year");
  const endOfYear = moment(date).endOf("year");
  const durationOfYear = endOfYear.diff(startOfYear);
  const diffFromStartOfYear = moment(date).diff(startOfYear);
  return (100 * diffFromStartOfYear) / durationOfYear;
}

// same thing from the end of the year
// (i.e. how far away from December 31th)
export function dateRightOffset(date: string): number {
  return 100 - dateLeftOffset(date);
}

export function offsetBetween(before: string, after: string): number {
  const startOfYear = moment(before).startOf("year");
  const endOfYear = moment(before).endOf("year");
  const durationOfYear = endOfYear.diff(startOfYear);
  const endToConsider = moment(after).isBefore(endOfYear)
    ? moment(after)
    : endOfYear;
  const diff = endToConsider.diff(moment(before));
  return (100 * diff) / durationOfYear;
}

export function isTimeRangeInYear(
  { start, end }: TimeRange,
  year: number
): boolean {
  return moment(start).year() <= year && moment(end).year() >= year;
}

// If the date is before or after the year,
// this will return instead the first day or the last
// of that year.
// If the date is in the year, returns it untouched
export function bringDateInYear(date: string, year: number): string {
  if (moment(date).year() < year) {
    return moment(year, "YYYY").startOf("year").toISOString();
  }
  if (moment(date).year() > year) {
    return moment(year, "YYYY").endOf("year").toISOString();
  }
  return date;
}
