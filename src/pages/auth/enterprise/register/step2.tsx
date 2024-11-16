import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import {
  TextCepCustom,
  TextPhoneCustom,
} from "@/globals/_components/custom-textfields";
import { AuthLayout } from "@/globals/layouts/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import { ufValues } from "@/globals/mocks/auth/enterprise";
import { getViaCepInfo } from "@/globals/requests";
import { BorderLinearProgress } from "./step1";
import { RegisterEnterprise } from "@/globals/atoms/auth/register-enterprise";
import { useGeolocation } from "@/globals/hooks/useGeolocation";
import LoadingComponent from "@/globals/_components/loading-component";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import * as Yup from "yup";

const RegisterPage = () => {
  const router = useRouter();
  const {
    location,
    geolocationErrorCode,
    geolocationErrorMsg,
    geoLoading,
    retry,
  } = useGeolocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [registerEnterpriseData, setRegisterEnterpriseData] =
    useRecoilState(RegisterEnterprise);

  const formik = useFormik({
    initialValues: {
      phone: "",
      cep: "",
      line1: "",
      number: "",
      neighbor: "",
      city: "",
      uf: "",
      complement: "",
      submit: null,
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("O Telefone é obrigatório"),
      cep: Yup.string().required("O CEP é obrigatório"),
      line1: Yup.string().required("O Logradouro é obrigatório"),
      neighbor: Yup.string().required("O Bairro é obrigatório"),
      city: Yup.string().required("A cidade é obrigatória"),
      uf: Yup.string().required("A UF do Estado é obrigatória"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        if (geolocationErrorCode === 1 || !location) {
          return alert(
            "Só é possível continuar com o cadastro aceitando compartilhar a localização! Pois assim conseguimos mostrar seu cadastro aos usuários próximos"
          );
        }

        helpers.setSubmitting(true);
        const replacedPhone = values.phone
          .replaceAll(")", "")
          .replaceAll("(", "")
          .replaceAll("-", "")
          .replaceAll(" ", "");
        const replacedCEP = values.cep.replaceAll("-", "");
        setRegisterEnterpriseData((prev: any) => ({
          ...prev,
          phone: replacedPhone,
          address: {
            cep: replacedCEP,
            city: values.city,
            complement: values.complement,
            line1: values.line1,
            neighbor: values.neighbor,
            number: values.number,
            uf: values.uf,
          },
          stage: 3,
        }));
      } catch (err: any) {
        setIsLoading(false);
        helpers.setSubmitting(false);
        setErrorMsg(err.response.data.error ?? err.error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.error ?? err.error });
        helpers.setSubmitting(false);
      }
    },
  });

  const getViaCepAddress = useCallback(async () => {
    var cep = formik.values.cep.replaceAll("-", "");
    if (cep.length === 8) {
      const values = await getViaCepInfo(cep);

      if (values) {
        formik.setFieldValue("cep", values.cep);
        formik.setFieldValue("line1", values.line1);
        formik.setFieldValue("city", values.city);
        formik.setFieldValue("neighbor", values.neighbor);
        formik.setFieldValue("complement", values.complement);
        formik.setFieldValue("uf", values.uf);
      }
    }
  }, [formik.values.cep]);

  const onStageChanged = useCallback(() => {
    if (registerEnterpriseData === null) return;
    else {
      const { stage } = registerEnterpriseData;

      if (stage === 2) {
        router.push("/auth/enterprise/register/step2");
        formik.setSubmitting(false);
      } else if (stage === 3) {
        router.push("/auth/enterprise/register/step3");
        formik.setSubmitting(false);
      } else if (stage === 4) {
        router.push("/auth/enterprise/register/finish");
        formik.setSubmitting(false);
      } else return formik.setSubmitting(false);
    }
  }, [registerEnterpriseData?.stage, registerEnterpriseData]);

  useEffect(() => {
    getViaCepAddress();
  }, [getViaCepAddress, formik.values.cep]);

  useEffect(() => {
    onStageChanged();
  }, [onStageChanged]);

  return (
    <>
      <Snackbar
        sx={{ width: "100%" }}
        open={errorMsg.length > 0}
        autoHideDuration={4000}
        onClose={() => setErrorMsg("")}
        message="Note archived"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          variant="filled"
          severity="error"
          sx={{ width: "50%" }}
          onClose={() => setErrorMsg("")}
        >
          {errorMsg}
        </Alert>
      </Snackbar>

      <Container>
        <Typography variant="h3" my={2} fontWeight={500}>
          Informe os telefones e o endereço.
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Insira o telefone e o endereço da sua loja para que clientes possam
          encontrar e contratar você facilmente. Essas informações serão
          visíveis em seu perfil.
        </Typography>

        <BorderLinearProgress variant="determinate" value={60} sx={{ my: 2 }} />

        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          {geolocationErrorCode === 1 || !location ? (
            <Button
              onClick={retry}
              variant="contained"
              endIcon={<MyLocationIcon />}
            >
              Requisitar Localização novamente
            </Button>
          ) : null}

          <Grid container sx={{ flex: "1 1 auto", py: 2 }} spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Whatsapp/Telefone*"
                name="phone"
                error={!!(formik.touched.phone && formik.errors.phone)}
                onChange={formik.handleChange}
                value={formik.values.phone}
                InputProps={{ inputComponent: TextPhoneCustom as any }}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="CEP"
                name="cep"
                error={!!(formik.touched.cep && formik.errors.cep)}
                onChange={formik.handleChange}
                value={formik.values.cep}
                InputProps={{ inputComponent: TextCepCustom as any }}
                fullWidth
                helperText={formik.touched.cep && formik.errors.cep}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                label="Logradouro"
                name="line1"
                error={!!(formik.touched.line1 && formik.errors.line1)}
                onChange={formik.handleChange}
                value={formik.values.line1}
                fullWidth
                helperText={formik.touched.line1 && formik.errors.line1}
                onBlur={formik.handleBlur}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                label="Número"
                name="number"
                error={!!(formik.touched.number && formik.errors.number)}
                onChange={formik.handleChange}
                value={formik.values.number}
                fullWidth
                helperText={formik.touched.number && formik.errors.number}
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
                helperText={formik.touched.neighbor && formik.errors.neighbor}
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
                helperText={formik.touched.city && formik.errors.city}
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
                helperText={formik.touched.uf && formik.errors.uf}
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
                error={
                  !!(formik.touched.complement && formik.errors.complement)
                }
                onChange={formik.handleChange}
                value={formik.values.complement}
                fullWidth
                helperText={
                  formik.touched.complement && formik.errors.complement
                }
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <StyledButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
            colors={["#003366", "#006DDB"]}
            textColor="white"
          >
            Continuar
          </StyledButton>
        </StyledForm>
      </Container>
    </>
  );
};

RegisterPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

const Container = styled(Box)`
  padding: 1rem 3.6rem;
  min-height: 100%;
  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 3rem 1rem;
  }
`;

const StyledForm = styled("form")`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
`;

const HaveAccount = styled(Typography)`
  a {
    font-weight: 700;
    color: ${COLORS.PRIMARY.MAIN};
    :hover {
      text-decoration-line: underline;
    }
  }
`;

export default RegisterPage;
