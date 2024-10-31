import LandingPageEnterprises from "@/globals/_components/lp/enterprise";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>INOVAMECANICA - Seja um Parceiro!</title>
        <meta
          name="description"
          content="Solução para conectar prestadores de serviços automotivos a clientes, torne-se um parceiro e tenha uma solução para se conectar ao seu cliente e possíveis clientes com facilidade"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPageEnterprises />
    </>
  );
}
