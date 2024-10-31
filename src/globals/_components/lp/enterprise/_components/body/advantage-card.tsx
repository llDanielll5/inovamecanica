import React from "react";
import styled from "@emotion/styled";
import { Card, Stack, Typography } from "@mui/material";

interface AdvantageCardEnterpriseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AdvantageCardEnterprise = (props: AdvantageCardEnterpriseProps) => {
  return (
    <Container elevation={11}>
      {props.icon}
      <Stack direction={"column"} rowGap={"10px"}>
        <Typography variant="h5" color="#17080A">
          {props.title}
        </Typography>
        <Typography variant="body1" color="#17080A">
          {props.description}
        </Typography>
      </Stack>
    </Container>
  );
};

const Container = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  column-gap: 20px;
  border-radius: 5px;

  -webkit-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

export default AdvantageCardEnterprise;
