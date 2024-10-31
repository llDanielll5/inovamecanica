/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { InovaLogo } from "../icons/inova-logo";
import useWindowSize from "../hooks/useWindowSize";
import { WIDTH_BREAKPOINTS } from "../utils/constants";

export const AuthLayout = (props: any) => {
  const { children } = props;
  const router = useRouter();
  const { width } = useWindowSize();

  return (
    <Container>
      <InnerContainer>
        <HeaderGrid>{children}</HeaderGrid>
        <Banner>
          <ImageBackground
            src={
              router.asPath === "/auth/enterprise/login"
                ? "/images/auth/enterprise/login-banner.png"
                : "/images/auth/enterprise/register-banner.png"
            }
          />
          <InovaLogo
            sx={{ fontSize: width! > 760 ? "260px" : "135px", zIndex: 2000 }}
          />
        </Banner>
      </InnerContainer>
    </Container>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};

const Container = styled(Box)`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
`;

const InnerContainer = styled(Grid)`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
`;

const HeaderGrid = styled(Grid)`
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 45%;
  border-top-right-radius: 37px;
  border-bottom-right-radius: 37px;
  z-index: 1000;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
    height: auto;
  }
`;

const Banner = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageBackground = styled("img")`
  position: absolute;
  right: 0;
  top: 0;
  object-fit: cover;
  width: 80%;
  max-height: 100vh;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    position: relative;
  }
`;

const BannerImage = styled(Grid)``;
