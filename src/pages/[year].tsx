import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import CalendarCore from "../components/calendar-core/CalendarCore";
import { isTimeRangeInYear } from "../dateUtils";
import { DEFAULT_SHOWS_IDS, loadData } from "../server.core";
import { SeasonWithShow, Show } from "../structs";

type Data = { year: number; seasons: SeasonWithShow[] };

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
      },
    };
  }
  // TODO faire une not found ici (attention il parait que ça peut exploser les types ?)
  throw new Error("missing year parameter");
  // TODO then use the data from db, get the correct series and seasons and so on, and display them roughly
  // TODO then plus the frontend with a calendar and a bit of css
};

function Page({
  year,
  seasons,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="page container-fluid">
      {/* <GlobalErrorBanner /> */}
      {/* <AuthBar /> */}
      {/* <About /> */}
      {/* <CalendarBar /> */}
      <CalendarCore {...{ year, seasons }} showRemoveButtons={false} />
    </div>
  );
}

export default Page;
