import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  linearProgressClasses,
  MenuItem,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "@/globals/layouts/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import LoadingComponent from "@/globals/_components/loading-component";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import {
  TextCepCustom,
  TextPhoneCustom,
} from "@/globals/_components/custom-textfields";
import * as Yup from "yup";
import axios from "axios";
import { ufValues } from "@/globals/mocks/auth/enterprise";
import { getViaCepInfo } from "@/globals/requests";
import { BorderLinearProgress } from "./step1";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  // const [userData, setUserData] = useRecoilState(UserData);

  const handleTogglePasswordVisible = (e: any) =>
    setPasswordVisible(!passwordVisible);

  const handleToggleConfirmPasswordVisible = (e: any) => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
        // setIsLoading(true);
        // setLoadingMsg("Estamos realizando o login...");

        // const { data } = await axios.post("/api/user/login", {
        //   email: values.email,
        //   password: values.password,
        // });
        // if (data.status === "success") {
        //   setIsLoading(false);
        //   // setUserData((prev: any) => ({ ...data.user }));
        // }

        router.push("/auth/enterprise/register/step3");
      } catch (err: any) {
        setIsLoading(false);
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

  useEffect(() => {
    getViaCepAddress();
  }, [getViaCepAddress, formik.values.cep]);

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
