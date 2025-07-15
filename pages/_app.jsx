import "../style/globals.css";

import { Inter } from "next/font/google";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={clsx(inter.className, "text-[HSL(180°, 0%, 20%)")}>
      <Component {...pageProps} />
      <div id="modals"></div>
    </main>
  );
}
