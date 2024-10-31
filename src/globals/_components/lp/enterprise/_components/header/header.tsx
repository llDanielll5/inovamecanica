import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { navLinks } from "@/globals/mocks/lp/enterprise";
import { StyledButton } from "./banner";
import useWindowSize from "@/globals/hooks/useWindowSize";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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
  const router = useRouter();
  const { width } = useWindowSize();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(!menuOpen);
  };

  const changeMenuVisible = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (anchorEl === null) setAnchorEl(e.currentTarget);
    else setAnchorEl(null);
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      {width! > 980 ? (
        <>
          <Box />
          <NavigationHeader />
        </>
      ) : (
        <IconButton
          onClick={changeMenuVisible}
          sx={{
            bgcolor: "rgba(255,255,255,0.15)",
            borderRadius: "5px",
            p: "2px",
          }}
        >
          {!menuOpen ? (
            <MenuIcon sx={{ color: "white", fontSize: "32px" }} />
          ) : (
            <CloseIcon sx={{ color: "white", fontSize: "32px" }} />
          )}
        </IconButton>
      )}

      <MobileContainerMenu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
            overflow: "auto",
          },
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            minWidth: width! - 30,
            "& .MuiAvatar-root": {},
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        {navLinks.map((item, i) => (
          <MenuItem
            key={i}
            sx={{ width: "100%", textAlign: "center" }}
            onClick={() => router.push(item.href)}
          >
            {item.text}
          </MenuItem>
        ))}
      </MobileContainerMenu>
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

const MobileContainerMenu = styled(Menu)`
  .MuiPaper-root {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform-origin: top center;
  }
`;

export default HeaderEnterprise;
