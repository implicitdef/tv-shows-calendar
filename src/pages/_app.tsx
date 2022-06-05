// TODO voir si ce reset est utile
// TODO fix la hauteur du calendrier, et autres petits détails CSS
import "../styles/globals.css";
import "../styles/index.scss";
// TODO voir si j'ai besoin de remettre le css de boostrap
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
