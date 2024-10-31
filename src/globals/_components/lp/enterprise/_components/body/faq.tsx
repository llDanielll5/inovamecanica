import React from "react";
import styled from "@emotion/styled";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { StyledButton } from "../header/banner";
import { COLORS } from "@/globals/utils/colors";
import AccordionComponent from "@/globals/_components/accordion";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import useWindowSize from "@/globals/hooks/useWindowSize";

const faq = [
  {
    title: "Como posso cadastrar minha empresa?",
    details:
      "É simples e rápido! Clique em 'Cadastre-se', preencha as informações da sua empresa e crie um perfil completo. Em minutos, você estará visível para clientes próximos que procuram por seus serviços.",
  },
  {
    title: "É preciso pagar para usar a plataforma?",
    details:
      "Não, para criar sua conta é completamente gratuito! Porém para utilizar os recursos adicionais e premium deverá pagar a mensalidade premium",
  },
  {
    title: "Como recebo os agendamentos dos clientes?",
    details:
      "Você recebe facilmente o agendamento na sua aba Dashboard da empresa. ",
  },
];

const titleAccordionStyle = {
  color: "#17080A",
  fontFamily: "Yantramanav",
  fontWeight: 900,
  ":hover": {
    color: COLORS.PRIMARY.MAIN,
  },
};
const detailsAccordionStyle = {
  color: "#17080A",
  fontFamily: "Open Sans",
  fontWeight: 400,
};

const FAQEnterprise = () => {
  const { width } = useWindowSize();
  return (
    <Container>
      <FaqContainer>
        <LeftSide>
          <Typography variant={width! > 760 ? "h2" : "h3"} color="#171717">
            Dúvidas Frequentes
          </Typography>
          <Typography variant="body1" color="#171717">
            Tem dúvidas sobre como aproveitar ao máximo nossa plataforma?
            Confira as perguntas mais comuns e veja como é fácil se cadastrar e
            começar a receber novos clientes!
          </Typography>

          {width! > 760 && (
            <StyledButton
              variant="contained"
              colors={["#006DDB"]}
              textColor="white"
              sx={{ width: "calc(100% /2.5)" }}
            >
              Precisa de ajuda?
            </StyledButton>
          )}
        </LeftSide>

        <RightSide>
          {faq.map((v, i) => (
            <AccordionComponent
              key={i}
              title={v.title}
              details={v.details}
              style={{
                backgroundColor: "#FFFFFF",
                width: "100%",
                margin: "24px 0",
                borderRadius: "12px",
                outline: "none",
                "&.Mui-expanded": {
                  backgroundColor: "#DADADA",
                },
              }}
              titleStyle={titleAccordionStyle}
              detailsStyle={detailsAccordionStyle}
            />
          ))}
        </RightSide>

        {width! < 760 && (
          <StyledButton
            variant="contained"
            colors={["#006DDB"]}
            textColor="white"
            sx={{ width: "max-content", p: "8px 10px", alignSelf: "center" }}
          >
            Precisa de ajuda?
          </StyledButton>
        )}
      </FaqContainer>

      <ContactContainer>
        <BottomImage src="/images/landing-page/enterprise/mechanic.png" />
        <FormContainer>
          <Typography variant={width! > 760 ? "h2" : "h3"} color="white" pb={4}>
            Tem Dúvidas? Nós podemos Ajudar!
          </Typography>
          <Grid container spacing={2} rowGap={"1rem"}>
            <Grid item lg={12} xs={12}>
              <TextField label="Nome" fullWidth />
            </Grid>
            <Grid item lg={6} xs={6}>
              <TextField label="Telefone" fullWidth />
            </Grid>
            <Grid item lg={6} xs={6}>
              <TextField label="Email" fullWidth />
            </Grid>
            <Grid item lg={12} xs={12}>
              <TextField label="Mensagem" fullWidth multiline rows={5} />
            </Grid>

            <Grid item lg={6}>
              <StyledButton
                variant="contained"
                colors={["#CC7818", "#ECAA5E"]}
                textColor="white"
                endIcon={<ArrowRightAltIcon />}
              >
                enviar
              </StyledButton>
            </Grid>
          </Grid>
        </FormContainer>
      </ContactContainer>
    </Container>
  );
};

const Container = styled(Box)`
  background-color: #252525;
  position: relative;
`;
const FaqContainer = styled(Box)`
  background-color: #f4f4f4;
  padding: 80px 7% 200px 7%;
  min-height: 713px;
  width: 100%;
  background-image: url(/images/landing-page/enterprise/faq-background.png);
  background-position: center left;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  column-gap: 5%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: column;
    background-image: none;
    min-height: 0px;
  }
`;

const LeftSide = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 50%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
`;
const RightSide = styled(Box)`
  width: 50%;
  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
`;

const BottomImage = styled("img")`
  position: absolute;
  bottom: -4px;
  right: 0;
  width: 80%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    display: none;
  }
`;

const ContactContainer = styled(Box)`
  min-height: 675px;
  width: 100%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    min-height: 0px;
  }
`;

const FormContainer = styled(Box)`
  background-color: #003366;
  position: absolute;
  bottom: 80px;
  left: 5%;
  width: 50%;
  padding: 60px;
  border-radius: 5px;
  transform: translateX(-5%);

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    position: relative;
    width: 100%;
    border-radius: 0;
    left: 0;
    transform: translateX(0);
    padding: 44px 22px;
    bottom: 0;
  }
`;

export default FAQEnterprise;
