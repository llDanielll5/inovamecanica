import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { StyledButton } from "../header/banner";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useWindowSize from "@/globals/hooks/useWindowSize";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface StepCardProps {
  title: string;
  description: string;
  step: number;
}

const StepCard = (props: StepCardProps) => {
  return (
    <StepCardContainer>
      <Step>
        <Typography variant="h6" color="white" textAlign={"center"}>
          Passo {props.step.toString()}
        </Typography>
      </Step>
      <StepCardInnerContainer>
        <Typography variant="h5" color="white" textAlign={"center"}>
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          fontSize={"1rem"}
          color="white"
          textAlign={"center"}
        >
          {props.description}
        </Typography>
      </StepCardInnerContainer>
    </StepCardContainer>
  );
};

const HowWorkEnterprise = () => {
  const { width } = useWindowSize();

  return (
    <Container>
      <Typography variant="h2" color="white" textAlign={"center"}>
        Como Funciona?
      </Typography>

      <StepsContainer>
        <StepCard
          description="Preencha um perfil completo com seus serviços e especialidades."
          title="Cadastre sua empresa"
          step={1}
        />
        {width! > 760 ? (
          <ChevronRightIcon
            sx={{ fontSize: "55px", color: "white", opacity: 0.1 }}
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{ fontSize: "55px", color: "white", opacity: 0.1 }}
          />
        )}
        <StepCard
          description="Sua empresa estará disponível para clientes próximos que buscam o que você oferece."
          title="Seja encontrado"
          step={2}
        />
        {width! > 760 ? (
          <ChevronRightIcon
            sx={{ fontSize: "55px", color: "white", opacity: 0.1 }}
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{ fontSize: "55px", color: "white", opacity: 0.1 }}
          />
        )}
        <StepCard
          description="Organize todos os agendamentos de clientes em um só lugar."
          title="Agende automaticamente"
          step={3}
        />
      </StepsContainer>

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
  background-color: #171717;
  padding: 5rem 7%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 4rem;
  background-image: url(/images/landing-page/enterprise/how-work.png);
  background-position: center right;
  background-repeat: no-repeat;
  background-size: contain;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    background-position: center bottom;
    background-size: contain;
  }
`;

const StepsContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 30px;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

const StepCardContainer = styled(Box)`
  padding: 1.5rem 0;
  width: calc(100% / 3 - 10px);
  position: relative;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
`;

const Step = styled(Box)`
  background-color: #006ddb;
  width: 50%;
  position: absolute;
  padding: 1rem;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
`;

const StepCardInnerContainer = styled(Box)`
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 4rem 2rem;
  display: flex;
  row-gap: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default HowWorkEnterprise;
