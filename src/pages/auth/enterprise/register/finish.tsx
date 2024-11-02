import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Snackbar,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { COLORS } from "@/globals/utils/colors";
import { AuthLayout } from "@/globals/layouts/auth";
import { WIDTH_BREAKPOINTS } from "@/globals/utils/constants";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { BorderLinearProgress } from "./step1";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import LoadingComponent from "@/globals/_components/loading-component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import axios from "axios";
import useWindowSize from "@/globals/hooks/useWindowSize";
import { CheckedIcon } from "@/globals/icons";

const RegisterPage = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [userData, setUserData] = useRecoilState(UserData);

  const handleFinishRegister = () => {
    router.push("/parceiros");
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
        <StyledCheckedIcon />

        <Typography variant="h3" my={2} fontWeight={700}>
          Tudo pronto!
          <br /> Seu cadastro foi enviado
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Agora é só aguardar! Vamos avaliar seu cadastro e você receberá a
          resposta em breve no seu e-mail.
        </Typography>

        <BorderLinearProgress variant="determinate" value={90} sx={{ my: 2 }} />

        <StyledForm>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <StyledButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            onClick={handleFinishRegister}
            colors={["#003366", "#006DDB"]}
            textColor="white"
          >
            Voltar
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
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    padding: 3rem 1rem;
  }
`;

const StyledForm = styled("form")`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  font-size: 20vw;

  @media screen and (max-width: ${WIDTH_BREAKPOINTS.PHONE}px) {
    font-size: 40vw;
  }
`;

export default RegisterPage;
