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
  background: linear-gradient(to right, #2eceff, #0086ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default LoadingComponent;
