import React from "react";
import { Box } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import styled from "@emotion/styled";

const DiaryAdminEnterprise = () => {
  return <Container></Container>;
};

const Container = styled(Box)`
  width: 100%;
`;

DiaryAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default DiaryAdminEnterprise;
