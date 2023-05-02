import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Web3Provider } from "../contexts/Web3Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}
