import React from "react";
import { Box } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";

const HomeAdminEnterprise = () => {
  return <Box />;
};

HomeAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default HomeAdminEnterprise;
