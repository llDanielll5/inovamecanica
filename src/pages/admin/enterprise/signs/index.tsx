import React from "react";
import { Box, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import styled from "@emotion/styled";
import { COLORS } from "@/globals/utils/colors";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const BasicPlanCard = () => {
  return (
    <BasicPlanContainer elevation={10}>
      <Typography
        fontFamily={"Open Sans"}
        fontWeight={500}
        fontSize={26}
        textAlign={"center"}
      >
        Básico
      </Typography>
      <Typography
        fontFamily={"Yantramanav"}
        fontWeight={800}
        fontSize={50}
        textAlign={"center"}
      >
        Grátis
      </Typography>
      <Typography
        fontFamily={"Open Sans"}
        fontWeight={500}
        fontSize={16}
        color="#677177"
        textAlign={"center"}
      >
        Cadastro gratuito e visibilidade básica para atrair novos clientes.
      </Typography>
    </BasicPlanContainer>
  );
};

const PremiumPlanCard = () => {
  return <PremiumPlanContainer elevation={10}></PremiumPlanContainer>;
};

const SignsAdminEnterprise = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabValue(newValue);

  return (
    <Container>
      <Stack
        direction={"row"}
        alignItems={"center"}
        bgcolor={"white"}
        borderRadius={12}
        maxHeight={68}
        minHeight={68}
        padding={"6px 9px"}
      >
        <StyledTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Mensal" />
          <StyledTab label="Semestral" />
          <StyledTab label="Anual" />
        </StyledTabs>
      </Stack>

      <CustomTabPanel value={tabValue} index={0}>
        <PlansContainer>
          <BasicPlanCard />
          <PremiumPlanCard />
        </PlansContainer>
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        Item Three
      </CustomTabPanel>
    </Container>
  );
};

const Container = styled(Box)`
  background-color: #f4f4f4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 18,
  fontFamily: "Open Sans",
  color: "#000",
  borderRadius: 40,
  minHeight: 58,
  maxHeight: 58,
  padding: "14px 40px",
  "&.Mui-selected": {
    color: "#FFF",
    backgroundColor: COLORS.PRIMARY.MAIN,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "max-content",
    backgroundColor: "transparent",
  },
});

const PlansContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  column-gap: 30px;
`;

const BasicPlanContainer = styled(Card)`
  border-radius: 20px;
  border: 1px solid rgba(0, 51, 102, 0.32);
  background-color: white;
  padding: 2rem;
  min-width: 314px;
  max-width: 314px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
`;

const PremiumPlanContainer = styled(Card)`
  border-radius: 20px;
  border: 1px solid #cc7818;
  background-color: ${COLORS.PRIMARY.MAIN};
  padding: 2rem;
  min-width: 314px;
  max-width: 314px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
`;

SignsAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SignsAdminEnterprise;
