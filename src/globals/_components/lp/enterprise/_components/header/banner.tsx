import React from "react";
import useWindowSize from "@/globals/hooks/useWindowSize";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";

const BannerEnterprise = () => {
  const { width } = useWindowSize();
  return (
    <Container>
      <BannerInformations>
        <Typography
          variant={width! > 760 ? "h1" : "h3"}
          color="white"
          textAlign={width! < 760 ? "center" : undefined}
        >
          Conecte sua oficina e lava-jato com clientes da sua região
        </Typography>

        <Typography
          variant="body2"
          color="white"
          fontWeight={400}
          textAlign={width! < 760 ? "center" : undefined}
        >
          Cadastre sua oficina, funilaria ou lava-jato e facilite para quem está
          por perto encontrar e agendar serviços com você.
        </Typography>

        <StyledButton
          variant="contained"
          textColor="white"
          colors={["#CC7818", "#ECAA5E"]}
          sx={
            width! < 760
              ? {
                  padding: "8px 10px",
                  width: "max-content",
                  alignSelf: "center",
                }
              : undefined
          }
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

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    background-image: linear-gradient(
        to right,

        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.9) 90%
      ),
      url(/images/landing-page/enterprise/mobile-banner.png);
  }
`;

const BannerInformations = styled(Box)`
  width: 40%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
  }
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
