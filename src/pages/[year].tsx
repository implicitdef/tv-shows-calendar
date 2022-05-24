import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DEFAULT_SHOWS_IDS, loadData } from "../server.core";
import { ShowAndSeasons } from "../structs";

type Data = { shows: ShowAndSeasons[] };

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
  const { year } = context.params || {};
  if (year && typeof year === "string") {
    // TODO gérer si pas un number
    const yearInt = parseInt(year, 10);
    // TODO pour optimiser on pourrait ne renvoyer pour chaque show que les seasons qu'ils ont cette année, s'ils en ont (à voir si on gagne vraiment des perfs ?)
    const shows = (await loadData()).filter((_) =>
      DEFAULT_SHOWS_IDS.includes(_.serie.id)
    );
    return {
      props: {
        shows,
      },
    };
  }
  // TODO faire une not found ici (attention il parait que ça peut exploser les types ?)
  throw new Error("missing year parameter");
  // TODO then use the data from db, get the correct series and seasons and so on, and display them roughly
  // TODO then plus the frontend with a calendar and a bit of css
};

function Page({
  shows,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
  return <p>shows : {shows.length}</p>;
}

export default Page;
