/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { InovaLogo } from "../icons/inova-logo";
import useWindowSize from "../hooks/useWindowSize";
import { WIDTH_BREAKPOINTS } from "../utils/constants";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Authentication } from "../atoms/auth";
import { getCookie } from "cookies-next";

export const AuthLayout = (props: any) => {
  const { children } = props;
  const router = useRouter();
  const { width } = useWindowSize();
  const auth = useRecoilValue(Authentication);

  useEffect(() => {
    const jwt = getCookie("jwt");
    if (auth.isAuth === false && jwt !== undefined) return;
    router.push("/admin/enterprise");
  }, [auth]);

  return (
    <Container>
      <InnerContainer>
        <BannerContainer>
          <ImageBanner
            image={
              router.asPath === "/auth/enterprise/login"
                ? "/images/auth/enterprise/login-banner.png"
                : router.asPath === "/auth/enterprise/register"
                ? "/images/auth/enterprise/register-banner.png"
                : "/images/auth/enterprise/recover.png"
            }
          >
            <Bar />
            <StyledLogo
              sx={{ fontSize: width! > 760 ? "260px" : "100px" }}
              onClick={() => router.push("/parceiros")}
            />
          </ImageBanner>
        </BannerContainer>
        <FormContainer>
          <Form>{children}</Form>
        </FormContainer>
      </InnerContainer>
    </Container>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};

const Container = styled(Box)`
  overflow: hidden;
  min-height: 100vh;
  background-color: #f6f6f6;
`;

const InnerContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  flex-direction: row-reverse;
  overflow: hidden;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    flex-direction: column;
  }
`;

const BannerContainer = styled(Box)`
  width: 60vw;
  height: 100vh;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
    height: 50vh;
    position: relative;
  }
`;

const ImageBanner = styled("div")<{ image: string }>`
  background-image: url(${({ image }) => image});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  position: relative;
  height: 100vh;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    position: relative;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledLogo = styled(InovaLogo)`
  z-index: 200;
  cursor: pointer;
`;

const Bar = styled(Box)`
  position: absolute;
  background-color: #f6f6f6;
  left: 0;
  top: 0;
  width: 30px;
  height: 100%;
  border-top-right-radius: 37px;
  border-bottom-right-radius: 37px;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    top: 100%;
    transform: translateY(-100%);
    width: 100%;
    height: 30px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 37px;
  }
`;

const FormContainer = styled("div")`
  width: 45vw;
  max-height: 100vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.1px; // largura da barra
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0; // cor de fundo da área da barra
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888; // cor do "polegar" (scroll handle)
    border-radius: 4px; // borda arredondada para o polegar
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; // cor ao passar o mouse
  }
  background-color: #f6f6f6;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    position: relative;
    overflow-y: auto;
    width: 100%;
  }
`;

const Form = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background-color: #f6f6f6;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    background-color: #f6f6f6;
  }
`;
