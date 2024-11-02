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

const RegisterPage = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [userData, setUserData] = useRecoilState(UserData);
  const [dataUrl, setDataUrl] = useState<any[] | null>([]);
  const [uploadedUrl, setUploadedUrl] = useState<any | null>(null);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file aborted");
      reader.onerror = () => console.log("file error");
      reader.onprogress = (load) => {
        console.log({ load });
      };
      reader.onloadstart = (e) => {
        console.log({ start: e });
      };
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataUrl((prev) => [...(prev ?? []), binaryStr]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const uploadImage = async () => {
    // meu upload
    console.log(acceptedFiles);
  };

  const formik = useFormik({
    initialValues: {
      submit: null,
    },
    // validationSchema: Yup.object({}),
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

        if (dataUrl?.length === 0) {
          return alert("Adicione ao menos uma imagem");
        }

        uploadImage();
        router.push("/auth/enterprise/register/finish");
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
        <Typography variant="h3" my={2} fontWeight={500}>
          Mostre seu espaço para os clientes!
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Escolha algumas fotos do seu estabelecimento para atrair clientes e
          destacar o que sua loja tem de especial!
        </Typography>

        <BorderLinearProgress variant="determinate" value={90} sx={{ my: 2 }} />

        <StyledForm noValidate onSubmit={formik.handleSubmit}>
          {isLoading && <LoadingComponent message={loadingMsg} />}

          <StyledDropZone {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DropFiles>
                <StyledCloudUploadIcon fontSize="large" />
              </DropFiles>
            ) : (
              <DropFileContent>
                <StyledUploadFileIcon />
                <Typography variant="body1" fontWeight={400}>
                  {width! > 760
                    ? "Arraste arquivos aqui ou clique para selecionar"
                    : "Clique para selecionar"}
                </Typography>
                <Typography variant="caption" fontWeight={700}>
                  (Apenas arquivos .jpeg ou .png são permitidos)
                </Typography>
              </DropFileContent>
            )}
          </StyledDropZone>

          {dataUrl?.length! > 0 && (
            <ImagesUploadedContainer>
              {dataUrl?.map((item, index) => (
                <ImageUploaded key={index}>
                  <CardMedia
                    component="img"
                    sx={{ width: 75 }}
                    image={item}
                    alt="Live from space album cover"
                  />

                  <InnerImageUploadedBox>
                    <Typography variant="h6">Nome do arquivo.png</Typography>
                    <Typography variant="h6" color="grey">
                      12MB
                    </Typography>
                    <ImageProgress variant="determinate" value={90} />
                  </InnerImageUploadedBox>

                  <Box>
                    <Tooltip title={`Excluir foto `}>
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ImageUploaded>
              ))}
            </ImagesUploadedContainer>
          )}

          <StyledButton
            variant="contained"
            sx={{ mt: 1 }}
            fullWidth
            type="submit"
            disabled={formik.isSubmitting}
            colors={["#003366", "#006DDB"]}
            textColor="white"
          >
            Finalizar
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
`;

const StyledDropZone = styled(Box)`
  width: 100%;
  border: 2px dashed ${COLORS.PRIMARY.LIGHT};
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d6e4f2;

  padding: 66px 0;
`;
const DropFiles = styled(Box)``;
const DropFileContent = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: ${COLORS.PRIMARY.LIGHT};
`;
const StyledUploadFileIcon = styled(UploadFileIcon)`
  color: ${COLORS.PRIMARY.LIGHT};
  font-size: 50px;
`;
const StyledCloudUploadIcon = styled(CloudUploadIcon)`
  font-size: 50px;
  color: ${COLORS.PRIMARY.LIGHT};
`;

const ImagesUploadedContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
  padding: 20px 0;
  width: 100%;
`;
const ImageUploaded = styled(Card)`
  display: flex;
  column-gap: 1rem;
  background-color: #e2e2e2;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
`;

const InnerImageUploadedBox = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const ImageProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#393939",
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY.LIGHT,
    ...theme.applyStyles("dark", {
      backgroundColor: COLORS.PRIMARY.LIGHT,
    }),
  },
}));

export default RegisterPage;
