import React from "react";
import { Box, Grid } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import styled from "@emotion/styled";
import Head from "next/head";
import { TotalChats } from "@/globals/_components/admin/enterprise/dashboard/total-chats";
import { TotalSchedules } from "@/globals/_components/admin/enterprise/dashboard/total-schedules";
import { OverviewBudget } from "@/globals/_components/admin/enterprise/dashboard/overview-budget";
import { formatToBrl } from "@/globals/utils/utils";
import { OverviewTotalCustomers } from "@/globals/_components/admin/enterprise/dashboard/overview-total-customers";
import { OverviewSales } from "@/globals/_components/admin/enterprise/dashboard/overview-sales";
import { OverviewLatestOrders } from "@/globals/_components/admin/enterprise/dashboard/overview-latest-orders";

const salesGraph = [
  {
    name: "Filial Brasilia",
    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
  {
    name: "Filial Uberlandia",
    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
  },
];

const HomeAdminEnterprise = () => {
  return (
    <Container>
      <Head>
        <title>Início · EvoMecanica</title>
      </Head>

      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xs={12}>
            <TotalChats trend="up" sx={{ height: "100%" }} value={"100"} />
          </Grid>

          <Grid item lg={6} sm={6} xs={12}>
            <TotalSchedules
              trend="down"
              sx={{ height: "100%" }}
              value={"100"}
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} lg={12}>
            <OverviewBudget
              difference={100}
              positive={true}
              sx={{ height: "100%" }}
              value={formatToBrl(100)}
            />
          </Grid> */}
          <Grid xs={12} sm={6} lg={6}>
            {/* <OverviewTotalCustomers
              difference={100}
              positive={false}
              sx={{ height: "100%" }}
              value={formatToBrl(200)}
            /> */}
          </Grid>

          {/* <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid> */}

          <Grid item xs={12} lg={12}>
            <OverviewSales chartSeries={salesGraph} sx={{ height: "100%" }} />
          </Grid>

          {/*<Grid xs={12} md={12} lg={12}>
              <OverviewTraffic
                chartSeries={[traffics.web, traffics.android, traffics.ios]}
                labels={["PC", "Android", "iPhone"]}
                sx={{ height: "100%" }}
              />
            </Grid>*/}

          <Grid item xs={12} lg={12}>
            <OverviewLatestOrders orders={[]} sx={{ height: "100%" }} />
          </Grid>

          {/* <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: "5ece2c077e39da27658aa8a9",
                    image: "/assets/products/product-1.png",
                    name: "Healthcare Erbology",
                    updatedAt: subHours(now, 6).getTime(),
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
};

const Container = styled(Box)`
  width: 100%;
  padding: 25px 50px;
`;

HomeAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default HomeAdminEnterprise;
