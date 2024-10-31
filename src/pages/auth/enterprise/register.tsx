import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  LinearProgress,
  linearProgressClasses,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "@/globals/layouts/auth";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingComponent from "@/globals/_components/loading-component";
import axios from "axios";
import * as Yup from "yup";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";

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
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("O nome é obrigatório"),
      phone: Yup.string().required("O telefone é obrigatório"),
      email: Yup.string()
        .email("Adicione um email válido")
        .required("O email é obrigatório!"),
      password: Yup.string()
        .required("A senha é obrigatória")
        .min(8, "A senha deve conter no mínimo 8 caracteres"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas devem coincidir-se")
        .required("É obrigatório confirmar a senha"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setIsLoading(true);
        setLoadingMsg("Estamos realizando o login...");

        const { data } = await axios.post("/api/user/login", {
          email: values.email,
          password: values.password,
        });
        if (data.status === "success") {
          setIsLoading(false);
          // setUserData((prev: any) => ({ ...data.user }));
        }
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err.response.data.error ?? err.error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.error ?? err.error });
        helpers.setSubmitting(false);
      }
    },
  });

  // useEffect(() => {
  //   if (userData === null) return;
  //   router.push("/admin");
  // }, [userData]);

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
          Crie sua conta e comece a crescer!
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Cadastre-se e torne sua empresa visível para clientes próximos que
          precisam dos seus serviços automotivos.
        </Typography>

        <BorderLinearProgress variant="determinate" value={20} sx={{ my: 2 }} />

        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <Grid container sx={{ flex: "1 1 auto", py: 2 }} spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="CNPJ*"
                name="name"
                error={!!(formik.touched.name && formik.errors.name)}
                onChange={formik.handleChange}
                value={formik.values.name}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Email*"
                name="email"
                error={!!(formik.touched.email && formik.errors.email)}
                onChange={formik.handleChange}
                value={formik.values.email}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Senha*"
                name="password"
                error={!!(formik.touched.password && formik.errors.password)}
                onChange={formik.handleChange}
                value={formik.values.password}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                type={!passwordVisible ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!passwordVisible ? (
                        <VisibilityIcon
                          onClick={handleTogglePasswordVisible}
                          sx={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={handleTogglePasswordVisible}
                          sx={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                label="Confirmar Senha*"
                name="confirmPassword"
                error={
                  !!(
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  )
                }
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                fullWidth
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                onBlur={formik.handleBlur}
                type={!confirmPasswordVisible ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!confirmPasswordVisible ? (
                        <VisibilityIcon
                          onClick={handleToggleConfirmPasswordVisible}
                          sx={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={handleToggleConfirmPasswordVisible}
                          sx={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
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
            Cadastrar
          </StyledButton>

          <HaveAccount mt={"24px"}>
            Já tem uma conta? <a href="/auth/enterprise/login">Entrar</a>
          </HaveAccount>
        </StyledForm>
      </Container>
    </>
  );
};

RegisterPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

const Container = styled(Box)`
  padding: 1rem 3.6rem;
`;

const StyledForm = styled("form")`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#393939",
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundImage: "linear-gradient(to right, #CC7818, #ECAA5E)",
    ...theme.applyStyles("dark", {
      backgroundImage: "linear-gradient(to right, #CC7818, #ECAA5E)",
    }),
  },
}));

export default RegisterPage;
