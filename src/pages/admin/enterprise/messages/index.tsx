import React from "react";
import { Box, Typography } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import styled from "@emotion/styled";

const MessagesAdminEnterprise = () => {
  return (
    <Container>
      <Typography variant="h5">Função em construção</Typography>
    </Container>
  );
};

const Container = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

MessagesAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default MessagesAdminEnterprise;
