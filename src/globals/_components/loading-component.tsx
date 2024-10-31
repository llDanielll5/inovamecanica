import { Box, CircularProgress, styled, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../utils/colors";

// import { Container } from './styles';

const LoadingComponent = (props: { message: string }) => {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      columnGap={2}
    >
      <StyledCircularProgress size={50} />
      <StyledLoadingText
        variant="subtitle1"
        sx={{ color: COLORS.PRIMARY, fontSize: "18px", mt: "8px" }}
      >
        {props.message}
      </StyledLoadingText>
    </Box>
  );
};

const StyledCircularProgress = styled(CircularProgress)`
  color: ${COLORS.PRIMARY};
`;
const StyledLoadingText = styled(Typography)`
  background: linear-gradient(
    to right,
    #ffff4a 0,
    #fcd000 4%,
    #ffc112 8% 11%,
    #ff8a00 16%,
    #ff5f5f,
    #ff253a 28%,
    #ff37a8 37%,
    #c739ff 49%,
    #a400e1 56%,
    #2eceff 72%,
    #0086ff 80%,
    #72f772 94%,
    #00d604
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default LoadingComponent;
