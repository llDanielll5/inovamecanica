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
import { RegisterEnterprise } from "@/globals/atoms/auth/register-enterprise";
import { BorderLinearProgress } from "./step1";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";
import { ROUTES } from "@/globals/requests/routes";
import { getCNPJInformations } from "../../../../globals/requests";
import LoadingComponent from "@/globals/_components/loading-component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import useWindowSize from "@/globals/hooks/useWindowSize";
import imageCompression from "browser-image-compression";
import axiosInstance from "@/globals/requests/axios";
import { useUploadFileWithFirebase } from "@/globals/hooks/useUploadFileWithFirebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/globals/requests/firebase";
import { Timestamp } from "firebase/firestore";
import useMultiImageUpload from "@/globals/hooks/useMultiImageUploadWithFirebase";

const RegisterPage = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { uploadImages, uploadStates } = useMultiImageUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const [userData, setUserData] = useRecoilState(UserData);
  const [dataUrl, setDataUrl] = useState<any[] | null>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [imagesUploadProgress, setImagesUploadProgress] = useState<number[]>(
    []
  );
  const [registerEnterpriseData, setRegisterEnterpriseData] =
    useRecoilState(RegisterEnterprise);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file aborted");
      reader.onerror = () => console.log("file error");
      reader.onload = () => {
        const binaryStr = reader.result;
        setDataUrl((prev) => [...(prev ?? []), binaryStr]);
        setFiles((prev) => [...(prev ?? []), file]);
        setImagesUploadProgress((prev) => [...(prev ?? []), 0]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, acceptedFiles, getInputProps, isDragActive } =
    useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (dataUrl?.length === 0 || dataUrl === null) return;

    try {
      let images = files;
      let imagesCompressed: any[] = [];

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      setLoadingMsg("Estamos comprimindo suas imagens...");

      for (let i = 0; i < images.length; i++) {
        const compressedFile = await imageCompression(
          images[i] as File,
          options
        );
        imagesCompressed.push(compressedFile);
      }

      await uploadImages(imagesCompressed);
      setLoadingMsg("Estamos validando seu CNPJ...");

      // const cnpjValues = await getCNPJInformations(
      //   registerEnterpriseData?.cnpj!
      // );

      const uploadedImages = await getUploadState();

      setRegisterEnterpriseData((prev: any) => ({
        ...prev,
        // enterprise: {
        //   companyName: cnpjValues?.companyName,
        //   phantasyName: cnpjValues?.phantasyName,
        //   startDate: cnpjValues?.startDate,
        //   status: cnpjValues?.status,
        //   cnae: cnpjValues?.cnae,
        // },
        images: uploadedImages,
      }));

      setLoadingMsg("Estamos finalizando seu cadastro...");

      if (registerEnterpriseData?.images?.length === 0) {
        setIsLoading(false);
        return alert("A imagem não subiu para o banco");
      }

      console.log({ "Dados Empresa": registerEnterpriseData, uploadedImages });

      const result = await axiosInstance.post(
        ROUTES.ENTERPRISE.REGISTER,
        registerEnterpriseData
      );

      if (result) {
        setRegisterEnterpriseData((prev: any) => ({ ...prev, stage: 4 }));
      }

      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error?.message ?? error ?? error?.code);
    }
  };

  const handleDeleteImage = (index: number) => {
    let filter = dataUrl?.filter((item, i) => index !== i);
    setDataUrl(filter as any[]);
  };

  const formik = useFormik({
    initialValues: {
      submit: null,
    },
    onSubmit: async (values, helpers) => {
      try {
        if (dataUrl?.length === 0) return alert("Adicione ao menos uma imagem");

        setIsLoading(true);
        setLoadingMsg("Estamos criando seu cadastro...");
        await handleSubmit();
      } catch (err: any) {
        setIsLoading(false);
        setErrorMsg(err.response.data.error ?? err.error);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.response.data.error ?? err.error });
        helpers.setSubmitting(false);
      }
    },
  });

  const onStageChanged = useCallback(() => {
    if (registerEnterpriseData === null) return;
    else {
      const { stage } = registerEnterpriseData;

      if (stage === 2) {
        router.push("/auth/enterprise/register/step2");
      } else if (stage === 3) {
        router.push("/auth/enterprise/register/step3");
      } else if (stage === 4) {
        router.push("/auth/enterprise/register/finish");
      } else return;
    }
  }, [registerEnterpriseData?.stage, registerEnterpriseData]);

  const getUploadState = useCallback(async () => {
    let uploadedImages: string[] = [];

    uploadStates.map((upload, i) => {
      console.log({ "Upload Image": upload });
      let imagesUploadProgressClone = imagesUploadProgress;
      imagesUploadProgressClone[i] = upload.progress;
      setImagesUploadProgress(imagesUploadProgressClone);

      if (upload.downloadURL !== null) {
        uploadedImages.push(upload.downloadURL);
      }
    });

    return uploadedImages;
  }, [uploadStates]);

  useEffect(() => {
    onStageChanged();
  }, [onStageChanged]);

  useEffect(() => {
    getUploadState();
  }, [getUploadState]);

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
                    <ImageProgress
                      variant="determinate"
                      value={imagesUploadProgress[index]}
                    />
                  </InnerImageUploadedBox>

                  <Box>
                    <Tooltip title={`Excluir foto `}>
                      <IconButton onClick={() => handleDeleteImage(index)}>
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
  justify-content: space-between;
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
