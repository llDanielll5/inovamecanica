/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";
import { SideNavLinks } from "./config";
import { SideNavItem } from "./side-nav-item";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
  styled,
  Avatar,
  Typography,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { InovaLogo } from "@/globals/icons/inova-logo";
import { SIDE_NAV_WIDTH } from "./layout";

import { useEffect } from "react";
import { setCookie } from "cookies-next";
import { useRecoilValue } from "recoil";
import { Authentication } from "@/globals/atoms/auth";

const scrollbarStyle = {
  "& .simplebar-content": {
    height: "100%",
  },
  "& .simplebar-scrollbar:before": {
    background: "neutral.400",
  },
};

export const SideNav = (props: any) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const auth = useRecoilValue(Authentication);

  const content = (
    <Scrollbar sx={scrollbarStyle}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 3 }}>
          <Box display="flex" alignItems={"center"} width={"100%"}>
            <Box
              component={NextLink}
              href="/parceiros"
              width={"100%"}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InovaLogo sx={{ fontSize: "120px" }} />
            </Box>
          </Box>
        </Box>

        <Box component="nav" sx={{ flexGrow: 1, px: 2, pb: 3 }}>
          <Stack
            component="ul"
            spacing={0.5}
            sx={{ listStyle: "none", p: 0, m: 0 }}
          >
            {SideNavLinks().map((item: any) => {
              let path =
                "/" +
                pathname
                  ?.split("/")[1]
                  .concat("/")
                  .concat(pathname?.split("/")[2]);
              const active = item.path === pathname;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Box sx={{ p: "0 2rem" }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.24)" }} />
          <Box display={"flex"} alignItems={"center"} my={"30px"} columnGap={2}>
            {/* <Avatar src={auth.me?.images?.[0]} /> */}
            <Stack direction={"column"}>
              <Typography variant="body1" fontWeight={600} color="white">
                {auth.me?.enterprise?.phantasyName ?? ""}
              </Typography>
              <Typography
                variant="caption"
                fontFamily={"Open Sans"}
                fontWeight={600}
                color="#848484"
              >
                {auth.email ?? ""}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "common.white",
            width: 289,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 289,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

const Scrollbar = styled(SimpleBar)`
  background-color: #002449;
  overflow-y: hidden;
`;
