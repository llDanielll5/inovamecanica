import React from "react";
import styled from "@emotion/styled";
import { Box, Card, Grid, Typography } from "@mui/material";
import useWindowSize from "@/globals/hooks/useWindowSize";
import GroupsIcon from "@mui/icons-material/Groups";
import AnimatedNumber from "@/globals/_components/animated-number";
import AdvantageCardEnterprise from "./advantage-card";
import { EngineerIcon, ToolBagIcon } from "@/globals/icons";
import { StyledButton } from "../header/banner";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";

const AdvantagesEnterprise = () => {
  const { width } = useWindowSize();
  return (
    <Container>
      <InnerContainer>
        <PicturesSide container spacing={width! > 760 ? 1 : 0.6}>
          <Grid item lg={4} md={6} xs={4} alignSelf={"flex-end"}>
            <CardVisibility>
              <StyledGroupIcon />
              <AnimatedNumber value={35} variant={"h3"} duration={2000} />
              <Typography variant={width! > 760 ? "h5" : "h6"} color="white">
                Visibilidade
              </Typography>
            </CardVisibility>
          </Grid>
          <Grid item lg={8} md={2} xs={8}>
            <img
              src="/images/landing-page/enterprise/why1.png"
              alt=""
              width={width! > 760 ? width! / 3.5 : width! / 1.75}
            />
          </Grid>
          <Grid item lg={10}>
            <img
              src="/images/landing-page/enterprise/why2.png"
              alt=""
              width={width! > 760 ? width! / 3 : width! / 1.5}
            />
          </Grid>
        </PicturesSide>
        <TextSide>
          <Typography variant={width! > 760 ? "h2" : "h4"} color="#171717">
            Por que cadastrar sua empresa aqui?
          </Typography>
          <Typography variant="body1" color="#171717">
            Com nossa plataforma, sua empresa ganha visibilidade para quem
            realmente está buscando seus serviços na região. Além disso, você
            aumenta suas chances de receber agendamentos e novos clientes
            diariamente, destacando suas especialidades e diferenciais.
          </Typography>

          <AdvantageCardEnterprise
            description="Seus serviços na vitrine de quem mais precisa, seus vizinhos!"
            icon={<StyledToolBagIcon />}
            title="Alcance Local"
          />

          <AdvantageCardEnterprise
            description="Simplifique o processo de contato e agendamento de serviços."
            icon={<StyledEngineerIcon />}
            title="Facilidade no Agendamento "
          />
        </TextSide>
      </InnerContainer>

      <StyledButton
        variant="contained"
        colors={["#CC7818", "#ECAA5E"]}
        textColor="white"
        href="/auth/enterprise/login"
      >
        quero fazer parte
      </StyledButton>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 4rem 7%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 3rem;
  background-color: #f4f4f4;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 1rem 7%;
  }
`;

const InnerContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  column-gap: 2.5rem;
  width: 100%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: column;
    column-gap: 0;
  }
`;

const PicturesSide = styled(Grid)`
  width: 50%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
`;
const CardVisibility = styled(Card)`
  background-color: #003366;
  width: 150px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  border-radius: 0.5rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 105px;
    height: 130px;
  }
`;
const TextSide = styled(Box)`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 1.1rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
`;

const StyledToolBagIcon = styled(ToolBagIcon)`
  color: #cc7818;
  width: 50px;
  height: 50px;
`;

const StyledEngineerIcon = styled(EngineerIcon)`
  color: #cc7818;
  width: 50px;
  height: 50px;
`;

const StyledGroupIcon = styled(GroupsIcon)`
  color: white;
  font-size: 5rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    font-size: 2.5rem;
  }
`;

export default AdvantagesEnterprise;
