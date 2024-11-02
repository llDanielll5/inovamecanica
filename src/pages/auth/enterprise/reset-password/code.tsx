import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
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
import axios from "axios";
import * as Yup from "yup";
import CodeInput from "@/globals/_components/code-input";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [userData, setUserData] = useRecoilState(UserData);

  const handleRepeatCode = async () => {};

  const handleCompleteCode = async (code: string) => {
    alert(code);
  };

  const handleSubmit = async () => {
    router.push("/auth/enterprise/new-password");
  };

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
          Digite o código de verificação
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Verifique seu e-mail e digite o código de 6 dígitos para redefinir sua
          senha.
        </Typography>
        <StyledForm>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <Typography
            variant="h6"
            fontFamily={"Open Sans"}
            fontWeight={600}
            alignSelf={"flex-start"}
            mt={"24px"}
            mb={1}
          >
            Código de verificação
          </Typography>

          <CodeInput length={6} onComplete={handleCompleteCode} />

          <StyledButton
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            // disabled={formik.isSubmitting}
            onClick={handleSubmit}
            colors={["#003366", "#006DDB"]}
            textColor="white"
          >
            Enviar
          </StyledButton>

          <HaveAccount mt={"24px"}>
            Não recebeu o código? <a onClick={handleRepeatCode}>Reenviar</a>
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
    cursor: pointer;
    :hover {
      text-decoration-line: underline;
    }
  }
`;

export default LoginPage;
