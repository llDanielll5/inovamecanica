import React from "react";
import styled from "@emotion/styled";
import { Box, Card, Grid, Typography } from "@mui/material";
import useWindowSize from "@/globals/hooks/useWindowSize";
import GroupsIcon from "@mui/icons-material/Groups";
import AnimatedNumber from "@/globals/_components/animated-number";
import AdvantageCardEnterprise from "./advantage-card";
import { EngineerIcon, ToolBagIcon } from "@/globals/icons";
import { StyledButton } from "../header/banner";

const AdvantagesEnterprise = () => {
  const { width } = useWindowSize();
  return (
    <Container>
      <InnerContainer>
        <PicturesSide container spacing={1}>
          <Grid item lg={4} alignSelf={"flex-end"}>
            <CardVisibility>
              <GroupsIcon sx={{ fontSize: "5rem", color: "white" }} />
              <AnimatedNumber value={35} variant={"h3"} duration={2000} />
              <Typography variant="h5" color="white">
                Visibilidade
              </Typography>
            </CardVisibility>
          </Grid>
          <Grid item lg={8}>
            <img
              src="/images/landing-page/enterprise/why1.png"
              alt=""
              width={width! / 3.5}
            />
          </Grid>
          <Grid item lg={10}>
            <img
              src="/images/landing-page/enterprise/why2.png"
              alt=""
              width={width! / 3}
            />
          </Grid>
        </PicturesSide>
        <TextSide>
          <Typography variant="h2" color="#171717">
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
`;

const InnerContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  column-gap: 2.5rem;
  width: 100%;
`;

const PicturesSide = styled(Grid)`
  width: 50%;
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
`;
const TextSide = styled(Box)`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 1.1rem;
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

export default AdvantagesEnterprise;
