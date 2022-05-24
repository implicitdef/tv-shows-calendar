import * as React from "react";
import { SeasonWithShow } from "../../structs";
import { pickFunkyColor } from "../utils/funkyColor";
import { getStyleForPeriodInYear } from "../utils/styleUtils";

// Displays a given season of a serie
const SeasonRow: React.FC<{
  year: number;
  season: SeasonWithShow;
  index: number;
  showRemoveButtons: boolean;
  onClose: () => void;
}> = ({ year, season, index, showRemoveButtons, onClose }) => {
  const { show, number: seasonNumber, time } = season;
  const { start, end } = time;
  const closingButton = showRemoveButtons ? (
    <button onClick={onClose} className="calendar-core__season-close">
      &times;
    </button>
  ) : null;
  return (
    <div className="calendar-core__season-row">
      <div
        className="calendar-core__season"
        style={{
          ...getStyleForPeriodInYear({
            year,
            start,
            end,
          }),
          backgroundColor: pickFunkyColor(show.name),
          zIndex: 100 + index,
        }}
      >
        {closingButton}
        <span className="calendar-core__season-name">
          {show.name.toUpperCase()}&nbsp;S{seasonNumber}
        </span>
      </div>
    </div>
  );
};

export default SeasonRow;
