import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/parceiros");
  }, []);

  return (
    <>
      <Head>
        <title>INOVAMECANICA - Mecânicas e Lava-Jatos</title>
        <meta
          name="description"
          content="Solução para conectar prestadores de serviços automotivos a clientes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
