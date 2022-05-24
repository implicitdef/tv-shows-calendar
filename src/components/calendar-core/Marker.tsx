import * as React from "react";
import { dateLeftOffset } from "../../dateUtils";

const Marker: React.FC<{
  now: string;
}> = ({ now }) => (
  <div
    className="calendar-core__marker"
    style={{ left: `${dateLeftOffset(now)}%` }}
  >
    <div className="calendar-core__marker-bar" />
  </div>
);

export default Marker;
