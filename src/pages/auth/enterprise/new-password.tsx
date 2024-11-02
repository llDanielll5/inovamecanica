import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Grid,
  InputAdornment,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "@/globals/layouts/auth";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import LoadingComponent from "@/globals/_components/loading-component";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const LoginPage = () => {
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
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("A senha é obrigatória")
        .min(8, "A senha deve conter no mínimo 8 caracteres"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas devem coincidir-se")
        .required("É obrigatório confirmar a senha"),
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

        router.push("/auth/enterprise/login");
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err.response.data.error ?? err.error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.error ?? err.error });
        helpers.setSubmitting(false);
      }
    },
  });
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
          Crie sua nova senha
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Digite uma nova senha segura para acessar sua conta
        </Typography>
        <StyledForm>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <Grid container sx={{ flex: "1 1 auto", py: 2 }} spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Nova Senha*"
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
                label="Confirme sua nova Senha*"
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
            sx={{ mt: 2 }}
            fullWidth
            disabled={formik.isSubmitting}
            colors={["#003366", "#006DDB"]}
            textColor="white"
          >
            Enviar
          </StyledButton>
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
    cursor: pointer;
    :hover {
      text-decoration-line: underline;
    }
  }
`;

export default LoginPage;
