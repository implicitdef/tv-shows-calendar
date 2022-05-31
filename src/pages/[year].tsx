import moment from "moment";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import CalendarBar from "../components/calendar-bar/CalendarBar";
import CalendarCore from "../components/calendar-core/CalendarCore";
import About from "../components/meta/About";
import AuthBar from "../components/meta/AuthBar";
import GlobalErrorBanner from "../components/meta/GlobalErrorBanner";
import { isTimeRangeInYear } from "../dateUtils";
import { DEFAULT_SHOWS_IDS, loadData } from "../server.core";
import { SeasonWithShow, Show } from "../structs";

type Data = { year: number; seasons: SeasonWithShow[]; now: string };

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const { year: yearStr } = context.params || {};
  if (yearStr && typeof yearStr === "string") {
    // TODO gérer si pas un number
    const year = parseInt(yearStr, 10);
    const defaultShowsWithSeasons = (await loadData()).filter((_) =>
      DEFAULT_SHOWS_IDS.includes(_.serie.id)
    );
    const seasons: SeasonWithShow[] = defaultShowsWithSeasons
      .flatMap(({ serie, seasons }) =>
        seasons.map((season) => ({ show: serie, ...season }))
      )
      .filter((_) => isTimeRangeInYear(_.time, year));
    return {
      props: {
        seasons,
        year,
        now: moment().toISOString(),
      },
    };
  }
  // TODO faire une not found ici (attention il parait que ça peut exploser les types ?)
  throw new Error("missing year parameter");
  // TODO then use the data from db, get the correct series and seasons and so on, and display them roughly
  // TODO then plus the frontend with a calendar and a bit of css
};

export function Page({
  year,
  seasons,
  now,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // TODO dynamise all these props properly
  return (
    <div className="page container-fluid">
      <GlobalErrorBanner hasError={true} />
      <AuthBar {...{ loggedInStatus: "loggedOut", email: null }} />
      <About {...{ isDisplayed: false }} />
      <CalendarBar {...{ year }} showAddShowButton={false} />
      <CalendarCore
        {...{ year, seasons }}
        now={moment(now)}
        showRemoveButtons={false}
      />
    </div>
  );
}

export default Page;
