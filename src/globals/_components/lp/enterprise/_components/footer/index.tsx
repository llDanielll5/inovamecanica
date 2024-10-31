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

const footerMenuLinks = [
  { href: "#", text: "Home" },
  { href: "#", text: "Vantagens" },
  { href: "#", text: "Como Funciona" },
  { href: "#", text: "Duvidas Frequentes" },
  { href: "#", text: "Contato" },
];
const services = [
  { href: "#", text: "Mecânicas" },
  { href: "#", text: "Lava-Jatos" },
  { href: "#", text: "Lanternagem   " },
];

const PlatformsDistributionCard = (props: {
  icon: React.ReactNode;
  platformName: string;
}) => {
  return (
    <PlatformCardContainer>
      {props.icon}
      <Stack direction="column">
        <Typography
          variant="h6"
          color="white"
          fontWeight={400}
          fontSize={".7rem"}
        >
          Baixar na{" "}
          <Typography
            variant="h6"
            color="white"
            fontWeight={400}
            fontSize={"1rem"}
          >
            {props.platformName}
          </Typography>
        </Typography>
      </Stack>
    </PlatformCardContainer>
  );
};

const FooterLandingPageEnterprise: React.FC = () => {
  return (
    <Container>
      <Grid container columnSpacing={4}>
        <Grid item lg={3}>
          <Typography variant="h6" color="white" pb={3}>
            Instale nosso aplicativo
          </Typography>

          <PlatformsContainer>
            <PlatformsDistributionCard
              icon={
                <AppleStoreIcon sx={{ color: "white", fontSize: "20px" }} />
              }
              platformName="Apple Store"
            />
            <PlatformsDistributionCard
              icon={<PlayStoreIcon sx={{ color: "white", fontSize: "20px" }} />}
              platformName="Play Store"
            />
          </PlatformsContainer>
        </Grid>

        <Grid item lg={3}>
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

        <Grid item lg={3}>
          <Stack direction="column" rowGap={"25px"}>
            <Typography variant="h5" color="white">
              Serviços
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

        <Grid
          item
          lg={3}
          sx={{ bgcolor: "#242424", p: 4, borderRadius: "5px" }}
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

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={400} variant="h6" color="white">
          © Inovamecanica 2025 | Todos os direitos reservados.
        </Typography>

        <Stack
          direction="row"
          justifyContent={"center"}
          alignItems="center"
          columnGap={2}
        >
          <Typography
            component={"a"}
            href="#"
            variant="h6"
            fontWeight={400}
            color="white"
          >
            Termo de Uso
          </Typography>
          <Typography
            component={"a"}
            href="#"
            variant="h6"
            fontWeight={400}
            color="white"
          >
            Política de Privacidade
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

const Container = styled("footer")`
  background-color: #171717;
  padding: 5rem 7% 1.8rem 7%;
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

const PlatformsContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 0.8rem;
`;

export default FooterLandingPageEnterprise;
