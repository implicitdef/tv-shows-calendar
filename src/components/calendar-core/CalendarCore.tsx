import moment, { Moment } from "moment";
import * as React from "react";
import Marker from "./Marker";
import MonthsBackground from "./MonthsBackground";
import MonthsNamesRow from "./MonthsNamesRow";
import SeasonRow from "./SeasonRow";
import { isTimeRangeInYear } from "../../dateUtils";
import { SeasonWithShow } from "../../structs";

const CalendarCore: React.FC<{
  year: number;
  now: Moment;
  seasons: SeasonWithShow[];
  showRemoveButtons: boolean;
}> = ({ year, seasons, now, showRemoveButtons }) => {
  const marker = now.year() === year ? <Marker now={now} /> : null;
  return (
    <div className="calendar-core">
      <div className="col-12 calendar-core__inner">
        {marker}
        <MonthsBackground year={year} />
        <MonthsNamesRow year={year} />
        {seasons
          // TODO est-ce que c'est là qu'on devrait filtrer ? c'est pas avant ?
          .filter((season) => {
            return isTimeRangeInYear(season.time, year);
          })
          .map((season, index) => {
            return (
              <SeasonRow
                key={`${season.show.id}S${season.number}`}
                index={index}
                season={season}
                year={year}
                /* TODO implement onClose */
                onClose={() => {}}
                showRemoveButtons={showRemoveButtons}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarCore;
