/* eslint-disable @next/next/no-img-element */
import PropTypes from "prop-types";
import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import { useRouter } from "next/router";

const gradient = {
  alignItems: "center",
  // background: "url(/images/lp/space-1.webp)",
  backgroundColor: "#c6f4ef",
  backgroundPosition: "center",
  backgroundSize: "cover",
  color: "white",
  display: "flex",
  justifyContent: "center",
  "& img": {
    maxWidth: "100%",
  },
};
const headerGrid = {
  // background:
  //   "url(https://img.freepik.com/free-vector/pastel-gradient-blur-background-vector_53876-174841.jpg?t=st=1721862691~exp=1721866291~hmac=36e380bb72140e4f9f12dcd5d8e79b2a97fe80ce06ba6f95a35ddb9b80600253&w=740)",
  backgroundColor: "#c6f4ef",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export const AuthLayout = (props: any) => {
  const { children } = props;
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", flex: "1 1 auto" }}>
      <Grid
        container
        sx={{ flex: "1 1 auto" }}
        flexDirection={
          router.asPath === "/auth/register" ? "row-reverse" : "row"
        }
      >
        <Grid xs={12} lg={8} sx={headerGrid}>
          {children}
        </Grid>
        <Grid xs={12} lg={4} sx={gradient}>
          <Box sx={{ p: 3 }}>
            <img
              alt=""
              src="/images/marie/vertical-logo.png"
              width={"100%"}
              onClick={() => window.open("/", "_self", "noreferrer,noopener")}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

AuthLayout.prototypes = {
  children: PropTypes.node,
};
