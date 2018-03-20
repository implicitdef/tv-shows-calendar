import * as moment from "moment";
import * as React from "react";
import * as Domain from "tv/shared/domain";
import * as Calendar from "tv/frontend/components/calendar-core/Calendar";
import * as CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";
import * as AuthBar from "tv/frontend/components/meta/AuthBar";
import * as About from "tv/frontend/components/meta/About";
import * as GlobalErrorBanner from "tv/frontend/components/meta/GlobalErrorBanner";

const noop = () => {};

const TruePage: React.SFC<{}> = ({}) => {
  return (
    <div className="page container-fluid">
      <GlobalErrorBanner.connected />
      <AuthBar.connected />
      <About.connected />
      <CalendarBar.connected />
      <Calendar.connected />
    </div>
  );
};

export default TruePage;
