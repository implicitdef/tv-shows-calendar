import { Moment } from "moment";
import * as React from "react";
import { dateLeftOffset } from "../../dateUtils";

const Marker: React.FC<{
  now: Moment;
}> = ({ now }) => (
  <div
    className="calendar-core__marker"
    style={{ left: `${dateLeftOffset(now.toISOString())}%` }}
  >
    <div className="calendar-core__marker-bar" />
  </div>
);

export default Marker;
