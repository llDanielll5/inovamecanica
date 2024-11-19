import FooterLandingPageEnterprise from "@/globals/_components/lp/enterprise/_components/footer";
import { COLORS } from "@/globals/utils/colors";
import { Box, styled, Typography } from "@mui/material";
import { GetServerSideProps } from "next";

interface TermsProps {
  title: string;
  content: string;
}

const termsOfUse = `

<ul><li><h3>1. Aceitação dos Termos</h3> 
Ao utilizar a plataforma Inova Mecânica, você concorda com os termos e condições aqui
estabelecidos,caso não concorde, pedimos que não utilize nossos serviços.</li></ul><br />

<ul><li><h3>2. Objetivo da Plataforma</h3> 
A Inova Mecânica atua como uma intermediadora entre oficinas, mecânicas, lava jatos e
clientes que buscam esses serviços,não somos responsáveis pelos trabalhos feitos dos serviços contratados nem pela relação estabelecida entre as partes.</li></ul><br />


<ul><li><h3>3. Cadastro e Uso da Conta</h3> 
Para utilizar a plataforma, é necessário criar uma conta e fornecer dados verídicos e
atualizados. A responsabilidade por manter a segurança da conta é exclusivamente do usuário.</li></ul><br />


<ul><li><h3>4. Serviços Disponíveis</h3> 
A Inova Mecânica facilita a comunicação e o contato entre clientes e prestadores de serviço. A
qualidade, execução e garantia dos serviços oferecidos pelos prestadores são de responsabilidade exclusiva dos mesmos.</li></ul><br />


<ul><li><h3>5. Modificações nos Termos</h3> 
Reservamo-nos o direito de modificar estes Termos a qualquer momento. As mudanças serão
comunicadas pela plataforma, e a continuidade do uso indica aceitação das alterações.</li></ul><br />

`;

const policyPrivacy = `

<ul><li><h3>1. Coleta de Informações</h3> 
Coletamos informações pessoais, como nome, e-mail, telefone e endereço, para a criação de
perfis e para facilitar o contato entre clientes e prestadores de serviços. Dados sobre o uso da plataforma também podem ser coletados para melhoria de nossos serviços.</li></ul><br />

<ul><li><h3>2. Uso das Informações</h3> 
As informações coletadas são utilizadas para viabilizar o uso da plataforma e facilitar a
interação entre clientes e prestadores. Dados pessoais não serão compartilhados com terceiros sem consentimento, exceto conforme exigido por lei.</li></ul><br />

<ul><li><h3>3. Armazenamento e Segurança</h3> 
Utilizamos práticas de segurança para proteger as informações pessoais dos usuários.
Contudo, não nos responsabilizamos por falhas externas ao nosso controle, como ataques cibernéticos.</li></ul><br />

<ul><li><h3>4. Exclusão de Dados</h3> 
O usuário pode solicitar a exclusão de seus dados pessoais a qualquer momento, exceto nos
casos em que o armazenamento seja necessário por lei.</li></ul><br />

`;

const TermsPage: React.FC<TermsProps> = ({ title, content }) => {
  return (
    <Box>
      <Banner>
        <a href="/parceiros">
          <img src="/images/inova/inova-shield.svg" alt="Logo of enterprise" />
        </a>
      </Banner>
      <Box p={4}>
        <Typography variant="h1" pb={3}>
          {title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Box>
      <FooterLandingPageEnterprise />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  // Substitua esta lógica pelo seu back-end ou banco de dados
  const terms = {
    "privacy-policy": {
      title: "Política de Privacidade",
      content: policyPrivacy,
    },
    "terms-of-use": {
      title: "Termos de Uso",
      content: termsOfUse,
    },
    lgpd: {
      title: "Lei Geral de Proteção de Dados (LGPD)",
      content: "<p>This is the terms of service content...</p>",
    },
  };

  const term = terms[slug as "privacy-policy" | "terms-of-use" | "lgpd"];

  if (!term)
    return {
      notFound: true, // Retorna 404 se o termo não for encontrado
    };

  return {
    props: {
      title: term.title,
      content: term.content,
    },
  };
};

const Banner = styled(Box)`
  background-color: ${COLORS.PRIMARY.MAIN};
  padding: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default TermsPage;
