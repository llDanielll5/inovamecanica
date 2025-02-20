import React, { useEffect, useState } from "react";
import useWindowSize from "@/globals/hooks/useWindowSize";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";

const images = [
  "/images/landing-page/enterprise/banner1.png",
  "/images/landing-page/enterprise/banner2.jpg",
  "/images/landing-page/enterprise/banner3.jpg",
];

const BannerEnterprise = () => {
  const { width } = useWindowSize();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {images.map((src, index) => (
        <BackgroundImage
          key={index}
          src={src}
          active={index === currentImage}
        />
      ))}
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
          href="/auth/enterprise/login"
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
  position: relative;
  width: 100%;
  min-height: 500px;
  max-height: 500px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding: 5rem 9%;
`;

const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ src: string; active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ src }) => `linear-gradient(
      to right,

      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.9) 90%
    ),url(${src})`};
  background-size: cover;
  background-position: center;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 1.5s ease-in-out;
`;

const BannerInformations = styled(Box)`
  position: relative;
  z-index: 2;
  width: 40%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
    text-align: center;
  }
`;

type StyledButtonType = {
  colors?: string[];
  textColor?: string;
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
