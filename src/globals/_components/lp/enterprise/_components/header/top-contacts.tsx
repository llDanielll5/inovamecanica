import React from "react";
import { COLORS } from "@/globals/utils/colors";
import { Box, Stack, styled, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { TiktokIcon } from "@/globals/icons";
import Link from "next/link";

interface ContactProps {
  icon: React.ReactNode;
  text: string;
}

const contacts = [{ icon: <></>, text: "" }];
const socials = [
  {
    social: "facebook",
    icon: <FacebookIcon fontSize="small" sx={{ color: "white" }} />,
    link: "https://www.facebook.com/profile.php?id=61567289707577",
  },
  {
    social: "instagram",
    icon: <InstagramIcon fontSize="small" sx={{ color: "white" }} />,
    link: "https://www.instagram.com/evomecanica",
  },
  {
    social: "tiktok",
    icon: <TiktokIcon fontSize="small" sx={{ color: "white" }} />,
    link: "https://www.tiktok.com/@evo.mecnica?_t=8qlPi0L7RSw&_r=1",
  },
  {
    social: "youtube",
    icon: <YouTubeIcon fontSize="small" sx={{ color: "white" }} />,
    link: "https://www.youtube.com/@EVOMEC%C3%82NICA",
  },
];

const ContactRow = (props: ContactProps) => {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      {props.icon}
      <Typography variant="body1" color="white">
        {props.text}
      </Typography>
    </Stack>
  );
};

const TopContacts = () => {
  return (
    <Container>
      <Box />
      <Stack direction={"row"} alignItems="center" columnGap={4}>
        <Typography variant="body2" color="white">
          INOVA MECÂNICA © Aplicação
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" columnGap={2}>
        {socials.map((item, index) => (
          <Link key={index} passHref href={item.link}>
            {item.icon}
          </Link>
        ))}
      </Stack>
    </Container>
  );
};

const Container = styled(Box)`
  background-color: ${COLORS.BLACK.DARK};
  padding: 1rem 5% 0.7rem 5%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default TopContacts;
