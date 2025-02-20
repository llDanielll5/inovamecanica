import React from "react";
import TopContacts from "./top-contacts";
import HeaderEnterprise from "./header";
import BannerEnterprise from "./banner";
import styled from "@emotion/styled";
import { InovaLogo } from "@/globals/icons/inova-logo";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import useWindowSize from "@/globals/hooks/useWindowSize";

// import { Container } from './styles';

const HeaderLandingPageEnterprise = () => {
  const { width } = useWindowSize();

  return (
    <>
      {width! > 760 && <TopContacts />}
      <HeaderEnterprise />
      <StyledLogo />
      <BannerEnterprise />
    </>
  );
};

const StyledLogo = styled(InovaLogo)`
  position: absolute;
  top: 30px;
  left: 5%;
  transform: translateX(-5%);
  width: 200px;
  height: 200px;
  z-index: 1000;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    width: 110px;
    height: 110px;
  }
`;

export default HeaderLandingPageEnterprise;
