import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const HeadLanding = () => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  const dynamicTitle =
    router.pathname === "/"
      ? "Karla Braga Nutricionista 🍎"
      : router.pathname === "/categories"
      ? "Marie Papelaria Fofa | Todas Categorias"
      : router.pathname === "/cart"
      ? "Meu carrinho ❤️🛒"
      : router.pathname === "/products/[id]"
      ? `${product?.name ?? ""} | Comprar agora | Marie Papelaria Fofa`
      : "Marie Papelaria Fofa";

  return (
    <Head>
      <title>{dynamicTitle}</title>

      <meta
        name="description"
        content={
          router.pathname === "/products/[id]"
            ? product?.description
            : "Marie Papelaria Fofa | Sua papelaria em casa | Tudo para escola, gráfica e moda escolar"
        }
      />
      <meta name="author" content="Sofx Softwares Inteligentes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="papelaria,marie,grafica,moda,escola,escolar,feminino,fofo,rosa,caderneta,lapis,lapiseira,caneta,fofa,borracha,caderno,unicórnio,azul-bebê"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadLanding;
