import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const BannerEnterprise = () => {
  return (
    <Container>
      <BannerInformations>
        <Typography variant="h1" color="white">
          Conecte sua oficina e lava-jato com clientes da sua região
        </Typography>

        <Typography variant="body2" color="white" fontWeight={400}>
          Cadastre sua oficina, funilaria ou lava-jato e facilite para quem está
          por perto encontrar e agendar serviços com você.
        </Typography>

        <StyledButton
          variant="contained"
          textColor="white"
          colors={["#CC7818", "#ECAA5E"]}
        >
          Cadastre-se agora
        </StyledButton>
      </BannerInformations>
    </Container>
  );
};

const Container = styled(Box)`
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.7) 60%,
      rgba(0, 0, 0, 0.9) 90%
    ),
    url(/images/landing-page/enterprise/banner.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 5rem 9%;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

const BannerInformations = styled(Box)`
  width: 40%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

type StyledButtonType = {
  colors?: string[];
  textColor: string;
};
export const StyledButton = styled(Button)<StyledButtonType>(
  ({ colors, textColor }) => ({
    transition: "0.4s",
    color: `${textColor}`,
    ...(colors && {
      background: `linear-gradient(to right, ${colors.join(",")})`,
    }),
    ":hover": {
      opacity: 0.8,
    },
  })
);

export default BannerEnterprise;
