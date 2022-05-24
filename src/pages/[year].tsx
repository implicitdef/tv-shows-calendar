import type { InferGetServerSidePropsType } from "next";
import { loadData } from "../server.core";

type Data = { message: string };

export const getServerSideProps = async () => {
  const dataFromDb = await loadData();
  // TODO get the year from the context and render some basic stuff
  // TODO then use the data from db, get the correct series and seasons and so on, and display them roughly
  // TODO then plus the frontend with a calendar and a bit of css

  return {
    props: {
      data,
    },
  };
};

function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // will resolve posts to type Data
}

export default Page;
