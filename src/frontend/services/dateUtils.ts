import * as moment from "moment";
import * as Domain from "tv/shared/domain";

// date : a momentjs object
// returns the offset in percentage
// of that date along the year
// (i.e. how far away from January 1st)
export function dateLeftOffset(date: moment.Moment): number {
  const startOfYear = date.clone().startOf("year");
  const endOfYear = date.clone().endOf("year");
  const durationOfYear = endOfYear.diff(startOfYear);
  const diffFromStartOfYear = date.diff(startOfYear);
  return 100 * diffFromStartOfYear / durationOfYear;
}

// same thing from the end of the year
// (i.e. how far away from December 31th)
export function dateRightOffset(date: moment.Moment): number {
  return 100 - dateLeftOffset(date);
}

export function offsetBetween(
  before: moment.Moment,
  after: moment.Moment
): number {
  const startOfYear = before.clone().startOf("year");
  const endOfYear = before.clone().endOf("year");
  const durationOfYear = endOfYear.diff(startOfYear);
  const endToConsider = after.isBefore(endOfYear) ? after : endOfYear;
  const diff = endToConsider.diff(before);
  return 100 * diff / durationOfYear;
}

export function isTimeRangeInYear(
  { start, end }: Domain.MTimeRange,
  year: number
): boolean {
  return start.year() <= year && end.year() >= year;
}

// If the date is before or after the year,
// this will return instead the first day or the last
// of that year.
// If the date is in the year, returns it untouched
export function bringDateInYear(
  date: moment.Moment,
  year: number
): moment.Moment {
  if (date.year() < year) {
    return moment(year, "YYYY").startOf("year");
  }
  if (date.year() > year) {
    return moment(year, "YYYY").endOf("year");
  }
  return date;
}
