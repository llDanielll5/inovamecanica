import React, { ReactNode, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import { Authentication } from "@/globals/atoms/auth";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { useFormik } from "formik";
import axiosInstance from "@/globals/requests/axios";
import { ROUTES } from "@/globals/requests/routes";
import { TextCNPJCustom } from "@/globals/_components/customTextFields";
import { enterpriseType } from "@/pages/auth/enterprise/register/step1";
import {
  TextCepCustom,
  TextPhoneCustom,
} from "@/globals/_components/custom-textfields";
import { ufValues } from "@/globals/mocks/auth/enterprise";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import CloseIcon from "@mui/icons-material/Close";
import { EnterpriseOpeningHoursData } from "@/globals/_components/admin/enterprise/_components/enterprise-opening-hours";
import useWindowSize from "@/globals/hooks/useWindowSize";

interface CustomAccordionInterface {
  title: string;
  content?: string | React.ReactNode;
  className?: string;
}

const CustomAccordion = (props: CustomAccordionInterface) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => setExpanded(!expanded);
  return (
    <StyledAccordion
      className={props.className}
      variant="outlined"
      expanded={expanded}
      onChange={handleChange}
      sx={{ "&:before": { height: "0px" } }}
    >
      <StyledAccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: "#003366" }} fontSize="large" />
        }
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography
          variant="h5"
          fontWeight={500}
          color={"#003366"}
          fontFamily={"Open Sans"}
        >
          {props.title}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{props.content}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

const MyEnterpriseAdminPage = () => {
  const { width } = useWindowSize();
  const [auth, setAuth] = useRecoilState(Authentication);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const enterpriseId = auth?.me?.id;
  let enterpriseValues = auth?.me?.enterprise;

  const formik = useFormik({
    initialValues: {
      cnpj: auth?.me?.cnpj ?? "",
      socialReason: enterpriseValues?.companyName ?? "",
      phantasyName: enterpriseValues?.phantasyName ?? "",
      enterpriseType: auth?.me?.type ?? "",
      phone: auth?.me?.phone ?? "",
      cep: auth?.me?.address?.cep ?? "",
      line1: auth?.me?.address?.line1 ?? "",
      number: auth?.me?.address?.number ?? "",
      neighbor: auth?.me?.address?.neighbor ?? "",
      city: auth?.me?.address?.city ?? "",
      uf: auth?.me?.address?.uf ?? "",
      complement: auth?.me?.address?.complement ?? "",
      images: auth?.me?.images ?? [],
      submit: null,
    },
    validationSchema: Yup.object({
      cnpj: Yup.string()
        .required("O CNPJ é obrigatório!")
        .min(18, "CNPJ deve conter caracteres válidos mínimos"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setSubmitting(true);
        setLoadingMsg("Estamos realizando o login...");

        // const { data } = await axiosInstance.post(ROUTES.ENTERPRISE.UPDATE(enterpriseId), {

        // });

        // if (data.status === 201) {
        //   setAuth((prev) => ({
        //     ...prev,
        //     email: values.email,
        //     isAuth: true,
        //     jwt: data.token,
        //     loginType: "ENTERPRISE",
        //   }));
        // }
      } catch (err: any) {
        helpers.setSubmitting(false);
        setErrorMsg(err.error ?? err.response.data.error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.error ?? err.response.data.error });
        helpers.setSubmitting(false);
      }
    },
  });

  const enterpriseGeneralData = () => (
    <Box sx={{ width: "100%" }}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="cnpj"
            label="CNPJ*"
            margin="dense"
            variant="filled"
            error={!!(formik.touched.cnpj && formik.errors.cnpj)}
            onChange={formik.handleChange}
            value={formik.values.cnpj}
            helperText={
              (formik.touched.cnpj && formik.errors.cnpj) as ReactNode
            }
            onBlur={formik.handleBlur}
            InputProps={{ inputComponent: TextCNPJCustom as any }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="socialReason"
            label="Razão Social*"
            margin="dense"
            variant="filled"
            error={
              !!(formik.touched.socialReason && formik.errors.socialReason)
            }
            onChange={formik.handleChange}
            value={formik.values.socialReason}
            helperText={
              (formik.touched.socialReason &&
                formik.errors.socialReason) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="phantasyName"
            label="Nome Fantasia*"
            margin="dense"
            variant="filled"
            error={
              !!(formik.touched.phantasyName && formik.errors.phantasyName)
            }
            onChange={formik.handleChange}
            value={formik.values.phantasyName}
            helperText={
              (formik.touched.phantasyName &&
                formik.errors.phantasyName) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="enterpriseType"
            label="Tipo de Empresa*"
            margin="dense"
            variant="filled"
            select
            error={
              !!(formik.touched.enterpriseType && formik.errors.enterpriseType)
            }
            onChange={formik.handleChange}
            value={formik.values.enterpriseType}
            helperText={
              (formik.touched.enterpriseType &&
                formik.errors.enterpriseType) as ReactNode
            }
            onBlur={formik.handleBlur}
          >
            {enterpriseType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );

  const enterprisePhoneData = () => (
    <Box sx={{ width: "100%" }}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="phone"
            label="Telefone*"
            margin="dense"
            variant="filled"
            error={!!(formik.touched.phone && formik.errors.phone)}
            onChange={formik.handleChange}
            value={formik.values.phone}
            helperText={
              (formik.touched.phone && formik.errors.phone) as ReactNode
            }
            onBlur={formik.handleBlur}
            InputProps={{ inputComponent: TextPhoneCustom as any }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            name="cep"
            label="CEP*"
            margin="dense"
            variant="filled"
            error={!!(formik.touched.cep && formik.errors.cep)}
            onChange={formik.handleChange}
            value={formik.values.cep}
            helperText={(formik.touched.cep && formik.errors.cep) as ReactNode}
            onBlur={formik.handleBlur}
            InputProps={{ inputComponent: TextCepCustom as any }}
          />
        </Grid>
        <Grid item xs={8} md={6}>
          <TextField
            label="Logradouro"
            name="line1"
            error={!!(formik.touched.line1 && formik.errors.line1)}
            onChange={formik.handleChange}
            value={formik.values.line1}
            fullWidth
            helperText={
              (formik.touched.line1 && formik.errors.line1) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={4} md={6}>
          <TextField
            label="Número"
            name="number"
            error={!!(formik.touched.number && formik.errors.number)}
            onChange={formik.handleChange}
            value={formik.values.number}
            fullWidth
            helperText={
              (formik.touched.number && formik.errors.number) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            label="Bairro"
            name="neighbor"
            error={!!(formik.touched.neighbor && formik.errors.neighbor)}
            onChange={formik.handleChange}
            value={formik.values.neighbor}
            fullWidth
            helperText={
              (formik.touched.neighbor && formik.errors.neighbor) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            label="Cidade"
            name="city"
            error={!!(formik.touched.city && formik.errors.city)}
            onChange={formik.handleChange}
            value={formik.values.city}
            fullWidth
            helperText={
              (formik.touched.city && formik.errors.city) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            label="Estado (UF)"
            name="uf"
            error={!!(formik.touched.uf && formik.errors.uf)}
            onChange={formik.handleChange}
            value={formik.values.uf}
            fullWidth
            helperText={(formik.touched.uf && formik.errors.uf) as ReactNode}
            onBlur={formik.handleBlur}
            select
          >
            {ufValues.map((option) => (
              <MenuItem key={option.uf} value={option.uf}>
                {`${option.name} (${option.uf})`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={12}>
          <TextField
            label="Complemento"
            name="complement"
            error={!!(formik.touched.complement && formik.errors.complement)}
            onChange={formik.handleChange}
            value={formik.values.complement}
            fullWidth
            helperText={
              (formik.touched.complement &&
                formik.errors.complement) as ReactNode
            }
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const enterprisePhotoData = () => (
    <PhotoContainer>
      <LeftPhotoSide>
        <Typography fontFamily={"Open Sans"} fontWeight={600} variant="body1">
          Foto de Perfil
        </Typography>

        <StyledImageContainer>
          <StyledImage src={auth?.me?.images?.[0] ?? ""} />
          <StyledCloseIcon>
            <CloseIcon fontSize="medium" />
          </StyledCloseIcon>
          <StyledCloseIcon />
        </StyledImageContainer>
      </LeftPhotoSide>
      <RightPhotoSide>
        <Typography fontFamily={"Open Sans"} fontWeight={600} variant="body1">
          Fotos da Empresa
        </Typography>
      </RightPhotoSide>
    </PhotoContainer>
  );

  return (
    <Container>
      <CustomAccordion
        title="Dados da Empresa"
        content={enterpriseGeneralData()}
      />
      <CustomAccordion
        title="Telefone e Endereço"
        content={enterprisePhoneData()}
      />
      <CustomAccordion title="Fotos" content={enterprisePhotoData()} />
      {width! > 760 && (
        <CustomAccordion
          title="Horário de Funcionamento"
          content={
            <EnterpriseOpeningHoursData
              onUpdateValues={(values) => console.log(values)}
            />
          }
        />
      )}
    </Container>
  );
};

const Container = styled(Box)`
  width: 100%;
  padding: 55px;
  display: flex;
  row-gap: 29px;
  flex-direction: column;

  .openingHours {
    @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
      display: none;
    }
  }

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 20px;
  }
`;
export const StyledAccordion = styled(Accordion)`
  width: 100%;
  border: 1px solid rgba(0, 51, 102, 0.35);
  border-radius: 8px;
  background-color: white;

  .MuiAccordionSummary-root {
    background-color: white !important;
  }
`;
const StyledAccordionSummary = styled(AccordionSummary)`
  border: 1px solid rgba(0, 51, 102, 0.35);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;
const StyledAccordionDetails = styled(AccordionSummary)`
  border: 1px solid rgba(0, 51, 102, 0.35);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 1rem 1.2rem;
`;
const PhotoContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  column-gap: 1rem;
`;
const LeftPhotoSide = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 50%;
`;
const RightPhotoSide = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 50%;
`;
const StyledImageContainer = styled("div")`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  position: relative;
`;
const StyledImage = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
const StyledCloseIcon = styled(IconButton)`
  position: absolute;
  right: 0;
  top: 0;
  color: white;
`;

MyEnterpriseAdminPage.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default MyEnterpriseAdminPage;
