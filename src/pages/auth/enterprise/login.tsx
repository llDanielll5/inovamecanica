import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
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
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [userData, setUserData] = useRecoilState(UserData);

  const handleTogglePasswordVisible = (e: any) =>
    setPasswordVisible(!passwordVisible);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Adicione um email válido")
        .required("O email é obrigatório!"),
      password: Yup.string()
        .required("A senha é obrigatória")
        .min(8, "A senha deve conter no mínimo 8 caracteres"),
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
        <Typography variant="h3" mt={2} p={1} fontWeight={500}>
          Acesse sua conta
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Pronto para atender mais clientes? Faça login e tenha acesso à sua
          agenda e perfil.
        </Typography>
        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <Grid container sx={{ flex: "1 1 auto", py: 2 }}>
            <TextField
              variant="filled"
              margin="dense"
              label="Email*"
              name="email"
              error={!!(formik.touched.email && formik.errors.email)}
              onChange={formik.handleChange}
              value={formik.values.email}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
            />
            <TextField
              margin="dense"
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

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                fontWeight={700}
                variant="body2"
                component={"a"}
                href="/auth/enterprise/reset-password"
                color={COLORS.PRIMARY.MAIN}
              >
                Esqueceu a senha?
              </Typography>
            </Box>
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
            Entrar
          </StyledButton>

          <HaveAccount mt={"24px"}>
            Ainda não tem conta?{" "}
            <a href="/auth/enterprise/register/step1">Cadastre-se agora</a>
          </HaveAccount>
        </StyledForm>
      </Container>
    </>
  );
};

LoginPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;

const Container = styled(Box)`
  padding: 1rem 3.6rem;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 3rem 1rem;
    height: 100%;
  }
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

export default LoginPage;
