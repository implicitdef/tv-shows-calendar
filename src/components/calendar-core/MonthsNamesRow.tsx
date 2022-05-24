import moment from "moment";
import * as React from "react";
import { range0_11 } from "../../dateUtils";
import { getStyleForMonthInYear } from "../utils/styleUtils";

// Lists the months at the top of the parts
const MonthsNamesRow: React.FC<{
  year: number;
}> = ({ year }) => (
  <div className="calendar-core__months-names-row">
    {range0_11.map((monthNumber) => {
      return (
        <div
          style={getStyleForMonthInYear({ year, monthNumber })}
          key={monthNumber}
          className="calendar-core__month-name"
        >
          {moment(year, "YYYY").month(monthNumber).format("MMMM").toLowerCase()}
        </div>
      );
    })}
  </div>
);

export default MonthsNamesRow;
