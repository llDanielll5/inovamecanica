import Head from "next/head";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LandingPageEnterprises from "@/globals/_components/lp/enterprise";
import { CONTACTS } from "@/globals/utils/constants";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const msg = `Olá!! Gostaria de entender mais sobre a EvoSabores.`;
  const zapHref = `https://api.whatsapp.com/send?phone=${
    CONTACTS.WHATSAPP
  }&text=${encodeURIComponent(msg)}`;

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

      <a
        href={zapHref}
        className="scrollup"
        id="scroll_up"
        target={"_blank"}
        rel="noopener noreferrer"
      >
        <WhatsAppIcon sx={{ color: "white" }} fontSize="large" />
      </a>
      <LandingPageEnterprises />
    </>
  );
}
