/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";

import { SideNavLinks } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useRecoilState, useRecoilValue } from "recoil";

import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  styled,
} from "@mui/material";
import SimpleBar from "simplebar-react";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

const scrollbarStyle = {
  height: "100%",
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
  // const [userData, setUserData] = useRecoilState(UserData);

  // useEffect(() => {
  //   const handlePersist = async () => {
  //     const user = await handleLoginPersistance();
  //     if (user === null) {
  //       setCookie("user", undefined);
  //       setUserData(UserDataDefault);
  //       return;
  //     }
  //     setUserData({ ...user });
  //   };

  //   handlePersist();
  // }, []);

  const content = (
    <Scrollbar sx={scrollbarStyle}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 3 }}>
          <Box display="flex" alignItems={"center"}>
            <Box component={NextLink} href="/admin">
              <img
                src="/images/marie/marie-mascot.png"
                alt=""
                style={{ height: 40, width: 40 }}
              />
            </Box>
            <Typography color="white" variant="subtitle1" ml={1}>
              Marie Papelaria Dashboard
            </Typography>
          </Box>
          <NameContainer>
            <div>
              {/* <Typography color="inherit" variant="subtitle1">
                {userData?.name}
              </Typography> */}
              <Typography color="neutral.400" variant="body2">
                {/* {getUserTypeRole(userData?.userType)} */}
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <ChevronUpDownIcon />
            </SvgIcon>
          </NameContainer>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box component="nav" sx={{ flexGrow: 1, px: 2, py: 3 }}>
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
              const active = item.path === pathname || path === item.path;

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
        <Divider sx={{ borderColor: "neutral.700" }} />
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
            width: 280,
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
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
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

const Scrollbar = styled(SimpleBar)``;

const NameContainer = styled(Box)`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding: 12px;
`;
