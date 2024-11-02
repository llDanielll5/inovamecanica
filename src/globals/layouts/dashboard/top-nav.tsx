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
import { getInitials } from "@/globals/utils/utils";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SIDE_NAV_WIDTH = 289;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props: any) => {
  const { onNavOpen, logout } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  // const userData = useRecoilValue(UserData);

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
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
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
              Dashboard
            </Typography>
          </Stack>

          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Notifications">
              <IconButton sx={{ backgroundColor: "#003366" }}>
                <Badge
                  badgeContent={4}
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
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              // src={userData?.profileImage}
            >
              {/* {getInitials(userData?.name)} */}A
            </Avatar>
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
