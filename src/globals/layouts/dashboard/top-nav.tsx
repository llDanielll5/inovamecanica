import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { AccountPopover } from "./account-popover";
import { usePopover } from "@/globals/hooks/usePopover";
import { useRecoilValue } from "recoil";
import { Authentication } from "@/globals/atoms/auth";
import { usePathname } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect } from "react";

const SIDE_NAV_WIDTH = 289;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props: any) => {
  const { onNavOpen, logout } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const auth = useRecoilValue(Authentication);
  const accountPopover = usePopover();
  const pathname = usePathname();

  const titleTop = () => {
    switch (pathname) {
      case "/admin/enterprise":
        return `Dashboard`;
      case "/admin/enterprise/my-enterprise":
        return `Minha Empresa`;
      case "/admin/enterprise/services":
        return `Serviços`;
      case "/admin/enterprise/messages":
        return `Mensagens`;
      case "/admin/enterprise/diary":
        return `Agenda`;
      case "/admin/enterprise/signs":
        return `Assinaturas`;
      case "/admin/enterprise/settings":
        return `Configurações`;
    }
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme: any) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          "-webkit-box-shadow": "0px 4px 15px 0px rgba(0,0,0,0.1)",
          "-moz-box-shadow": "0px 4px 15px 0px rgba(0,0,0,0.1)",
          "box-shadow": "0px 4px 15px 0px rgba(0,0,0,0.1)",
          width: { lg: `calc(100% - ${SIDE_NAV_WIDTH}px)` },
          zIndex: (theme: any) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            zIndex: 299,
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton
                onClick={onNavOpen}
                sx={{ bgcolor: "#33506D", borderRadius: "9px" }}
              >
                <SvgIcon fontSize="small">
                  <MenuIcon fontSize="large" sx={{ color: "white" }} />
                </SvgIcon>
              </IconButton>
            )}
            <Typography
              variant="h4"
              fontWeight={500}
              justifySelf={"flex-start"}
              color="#003366"
              pl={2}
            >
              {titleTop()}
            </Typography>
          </Stack>

          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton sx={{ backgroundColor: "#003366" }}>
                <Badge
                  badgeContent={0}
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <SvgIcon fontSize="small">
                    <NotificationsIcon sx={{ color: "white" }} />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{ cursor: "pointer", height: 40, width: 40 }}
              src={auth?.me?.images?.[0] ?? ""}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
        logout={logout}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
  logout: PropTypes.any,
};
