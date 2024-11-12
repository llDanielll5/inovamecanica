import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AppleStoreIcon, PlayStoreIcon } from "@/globals/icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import useWindowSize from "@/globals/hooks/useWindowSize";
import { useRouter } from "next/router";

const footerMenuLinks = [
  { href: "/", text: "Home" },
  { href: "#advantages", text: "Vantagens" },
  { href: "#how-work", text: "Como Funciona" },
  { href: "#faq", text: "Duvidas Frequentes" },
  { href: "#contact", text: "Contato" },
];
const services = [
  { href: "#", text: "Mecânicas" },
  { href: "#", text: "Lava-Jatos" },
  { href: "#", text: "Lanternagem" },
];

const FooterLandingPageEnterprise = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  return (
    <Container>
      <Grid container columnSpacing={width! > 760 ? 4 : 0} rowGap={6}>
        <Grid item lg={3} xs={6}>
          <Typography variant="h6" color="white" pb={3}>
            Instale nosso aplicativo
          </Typography>

          <PlatformsContainer>
            <StyledPlatformDistribution
              src="/images/landing-page/enterprise/google-play.png"
              alt=""
              onClick={() => router.push("#")}
            />
            <StyledPlatformDistribution
              src="/images/landing-page/enterprise/app-store.png"
              alt=""
              onClick={() => router.push("#")}
            />
          </PlatformsContainer>
        </Grid>

        <Grid item lg={3} xs={12}>
          <Stack direction="column" rowGap={"25px"}>
            <Typography variant="h5" color="white">
              Menu
            </Typography>

            {footerMenuLinks.map((item, index) => (
              <Typography
                key={index}
                variant="h6"
                fontWeight={400}
                component={"a"}
                href={item.href}
                color="white"
              >
                {item.text}
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid item lg={3} xs={12}>
          <Stack direction="column" rowGap={"25px"}>
            <Typography variant="h5" color="white">
              Serviços
            </Typography>

            {services.map((item, index) => (
              <Typography
                key={index}
                variant="h6"
                fontWeight={400}
                component={"a"}
                href={item.href}
                color="white"
              >
                {item.text}
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid
          item
          lg={3}
          xs={12}
          sx={{
            bgcolor: "#242424",
            borderRadius: "5px",
            p: 4,
          }}
        >
          <Stack direction="column" rowGap={"25px"}>
            <Typography variant="h5" color="white">
              Novidades?
            </Typography>

            <Typography variant="h6" fontWeight={400} color="white">
              Se inscreva e fique por dentro das novidades
            </Typography>

            <TextField
              label="Seu E-mail"
              variant="filled"
              fullWidth
              sx={{
                position: "relative",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent", // Remove a borda de foco
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        width: "50px",
                        height: "52px",
                        bgcolor: "#006DDB",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: "7px",
                        borderBottomRightRadius: "7px",
                        position: "absolute",
                        right: 0,
                      }}
                    >
                      <ArrowForwardIcon sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ mt: "4.6rem", mb: "1.2rem" }} />

      <FooterTermsContainer>
        <Typography
          fontWeight={400}
          variant="h6"
          color="white"
          fontSize={width! > 760 ? "18px" : "14px"}
        >
          © Inovamecanica 2025 | Todos os direitos reservados.
        </Typography>

        <FooterTerms>
          <Typography
            component={"a"}
            href="#"
            variant="h6"
            fontWeight={400}
            color="white"
            fontSize={width! > 760 ? "18px" : "14px"}
          >
            Termo de Uso
          </Typography>
          <Typography
            component={"a"}
            href="#"
            variant="h6"
            fontWeight={400}
            color="white"
            fontSize={width! > 760 ? "18px" : "14px"}
          >
            Política de Privacidade
          </Typography>
        </FooterTerms>
      </FooterTermsContainer>
    </Container>
  );
};

const Container = styled("footer")`
  background-color: #171717;
  padding: 5rem 7% 1.8rem 7%;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 63px 22px 40px 22px;
  }
`;

const PlatformCardContainer = styled(Box)`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.2rem;
  border-radius: 4px;
  width: 80%;
  align-self: flex-start;
`;

const DoubleText = styled(Typography)`
  span {
    font-family: "Yantramanav";
    color: white;
    font-weight: 400;
    font-size: 1rem;
    white-space: nowrap;
  }
`;

const FooterTermsContainer = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: column-reverse;
    row-gap: 1.3rem;
    padding-top: 1.3rem;
  }
`;

const FooterTerms = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const PlatformsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: row;
    justify-content: space-between;
    column-gap: 2.5%;
  }
`;

const StyledPlatformDistribution = styled("img")`
  min-width: 185px;
  max-width: 185px;
  max-height: 55px;
  object-fit: contain;
  cursor: pointer;
  transition: 0.3s;
  scale: 0.95;

  :hover {
    scale: 1;
  }

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    max-width: 45%;
    max-height: 50px;
  }
`;

export default FooterLandingPageEnterprise;
