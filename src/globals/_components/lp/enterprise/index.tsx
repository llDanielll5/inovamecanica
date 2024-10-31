import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import HeaderLandingPageEnterprise from "./_components/header";
import BodyLandingPageEnterprise from "./_components/body";
import FooterLandingPageEnterprise from "./_components/footer";

const LandingPageEnterprises: React.FC = () => {
  return (
    <Container>
      <HeaderLandingPageEnterprise />
      <BodyLandingPageEnterprise />
      <FooterLandingPageEnterprise />
    </Container>
  );
};

const Container = styled(Box)`
  position: relative;
`;

export default LandingPageEnterprises;
