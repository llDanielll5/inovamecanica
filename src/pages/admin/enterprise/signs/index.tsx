import React from "react";
import { Box, Card, Stack, Tab, Tabs, Typography } from "@mui/material";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import { COLORS } from "@/globals/utils/colors";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { formatToBrl } from "@/globals/utils/utils";

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
      style={{ overflowX: "scroll", width: "100%" }}
    >
      {value === index && (
        <Box sx={{ py: 3, display: "flex", alignItems: "center" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const BenefitOfPlan = (props: { text: string; textColor?: string }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} columnGap={"10px"}>
      <CheckIcon sx={{ color: COLORS.GOLD.MAIN }} fontSize="medium" />
      <Typography
        variant="body1"
        fontSize={"clamp(15px, 1vw, 22px)"}
        color={props.textColor}
      >
        {props.text}
      </Typography>
    </Stack>
  );
};

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
      <Typography variant="h1" textAlign={"center"}>
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

      <Box
        alignSelf={"flex-start"}
        my={3}
        display={"flex"}
        flexDirection={"column"}
        rowGap={1}
      >
        {[
          "Acesso a plataforma",
          "Visualização Padrão",
          "Dados gerais da Empresa",
          "Listar Serviços",
        ].map((item, index) => (
          <BenefitOfPlan text={item} key={index} />
        ))}
      </Box>

      <StyledButton
        disabled
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "capitalize" }}
        fullWidth
      >
        Plano selecionado
      </StyledButton>
    </BasicPlanContainer>
  );
};

const PremiumPlanCard = (props: { value: number; advantages: string[] }) => {
  return (
    <PremiumPlanContainer elevation={10}>
      <Typography
        fontFamily={"Open Sans"}
        fontWeight={500}
        fontSize={26}
        textAlign={"center"}
        color="white"
      >
        Premium
      </Typography>
      <Typography variant="h1" textAlign={"center"} color="white">
        {formatToBrl(props.value)}
      </Typography>
      <Typography
        fontFamily={"Open Sans"}
        fontWeight={500}
        fontSize={16}
        color="#D2D2D2"
        textAlign={"center"}
      >
        Cadastro gratuito e visibilidade básica para atrair novos clientes.
      </Typography>

      <Box
        alignSelf={"flex-start"}
        my={3}
        display={"flex"}
        flexDirection={"column"}
        rowGap={1}
      >
        {props.advantages.map((item, index) => (
          <BenefitOfPlan text={item} key={index} textColor="white" />
        ))}
      </Box>

      <StyledButton
        variant="contained"
        sx={{ borderRadius: 2, textTransform: "capitalize" }}
        colors={COLORS.DEGRADE.GOLD}
        fullWidth
        onClick={() => alert("Em desenvolvimento")}
      >
        Selecionar Plano
      </StyledButton>
    </PremiumPlanContainer>
  );
};

const SignsAdminEnterprise = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setTabValue(newValue);

  return (
    <Container>
      <TabContainer elevation={10}>
        <StyledTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Mensal" />
          <StyledTab label="Semestral" />
          <StyledTab label="Anual" />
        </StyledTabs>
      </TabContainer>

      {tabValue === 0 && (
        <PlansContainer>
          <BasicPlanCard />
          <PremiumPlanCard
            advantages={[
              "Acesso a plataforma",
              "Visualização Padrão",
              "Dados gerais da Empresa",
              "Listar Serviços",
              "Receber agendamento",
            ]}
            value={49.9}
          />
        </PlansContainer>
      )}
    </Container>
  );
};

const Container = styled(Box)`
  background-color: #f4f4f4;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  padding: 3rem 5%;
  row-gap: 2rem;
`;

const TabContainer = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 40px;
  min-height: 68px;
  max-height: 68px;
  padding: 6px 9px;
  width: max-content;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    min-height: 40px;
    max-height: 40px;
    max-width: 90%;
  }
`;

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    variant="fullWidth"
    // TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  alignItems: "center",
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

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))`
  text-transform: none;
  font-weight: 600;
  font-size: clamp(0.75rem, 1vw, 2.2rem);
  font-family: Open Sans;
  color: #000;
  border-radius: 40px;
  min-height: 58px;
  max-height: 58px;
  padding: 14px 40px;
  width: 100%;
  &.Mui-selected {
    color: #fff;
    background-color: ${COLORS.PRIMARY.MAIN};
  }
  &.Mui-focusVisible {
    background-color: rgba(100, 95, 228, 0.32);
  }
  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    min-height: 30px;
    max-height: 30px;
  }
`;

const PlansContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1.5rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    flex-direction: column;
    row-gap: 1rem;
  }
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

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    max-width: 90%;
    min-width: 90%;
  }
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

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

SignsAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SignsAdminEnterprise;
