import type { InferGetServerSidePropsType } from "next";
import { loadData } from "../server.core";

type Data = { message: string };

export const getServerSideProps = async () => {
  const data: Data = await loadData();

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
