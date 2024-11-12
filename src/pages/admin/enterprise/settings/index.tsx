import React from "react";
import { Box } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import styled from "@emotion/styled";

const SettingsAdminEnterprise = () => {
  return <Container></Container>;
};

const Container = styled(Box)`
  width: 100%;
`;

SettingsAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SettingsAdminEnterprise;
