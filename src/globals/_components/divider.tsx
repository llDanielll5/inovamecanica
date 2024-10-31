import { Box, styled } from "@mui/material";
import React from "react";

// import { Container } from './styles';

const CustomDivider: React.FC = () => {
  return (
    <Padding>
      <StyledDivider />
    </Padding>
  );
};

const Padding = styled(Box)`
  padding: 3rem;
`;

const StyledDivider = styled("hr")`
  border-top: 1px solid #ddd;
  padding: 0 3rem;
`;

export default CustomDivider;
