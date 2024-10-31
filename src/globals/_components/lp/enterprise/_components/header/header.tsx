import React from "react";
import { COLORS } from "@/globals/utils/colors";
import styled from "@emotion/styled";
import { Box, Button, Stack, Typography } from "@mui/material";
import { navLinks } from "@/globals/mocks/lp/enterprise";
import Link from "next/link";
import { StyledButton } from "./banner";

interface HeaderEnterpriseProps {}

const NavigationHeader = () => {
  return (
    <Stack direction="row" alignItems={"center"} columnGap={2}>
      {navLinks.map((item, index) => {
        if (index !== navLinks.length - 1)
          return (
            <Link passHref href={item.href} key={index}>
              <Typography
                variant="h6"
                color="white"
                fontSize={"14px"}
                fontFamily={"Open Sans"}
                fontWeight={600}
              >
                {item.text}
              </Typography>
            </Link>
          );
        else
          return (
            <StyledButton
              variant="contained"
              LinkComponent={"a"}
              href={item.href}
              sx={{ marginLeft: "1rem" }}
              textColor="white"
              colors={["#CC7818", "#ECAA5E"]}
            >
              {item.text}
            </StyledButton>
          );
      })}
    </Stack>
  );
};

const HeaderEnterprise = () => {
  return (
    <Container>
      <Box />
      <NavigationHeader />
    </Container>
  );
};

const Container = styled(Box)`
  background-color: #003366;
  padding: 1.5rem 5%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 2rem;
`;

export default HeaderEnterprise;
