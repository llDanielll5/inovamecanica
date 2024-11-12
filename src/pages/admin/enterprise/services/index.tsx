/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Pagination,
  Stack,
  Grid,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Authentication } from "@/globals/atoms/auth";
import { PaginationProps } from "../../../../../types";
import Loading from "@/globals/_components/loading";
import CModal from "@/globals/_components/custom-modal";
import { maskValue } from "@/globals/utils/utils";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import AdminEnterpriseServicesTable from "@/globals/_components/tables/admin/enterprise/services-table";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";

interface TreatmentValues {
  name: string;
  price: string;
}

const defaultValues: TreatmentValues = {
  name: "",
  price: "",
};

type RegisterType = "Register" | "Edit";

const ServicesAdminEnterprise = (props: any) => {
  const [treatmentID, setTreatmentID] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [treatmentValues, setTreatmentValues] = useState(defaultValues);
  const [registerType, setRegisterType] = useState<RegisterType>("Register");
  const [treatments, setTreatments] = useState<any[]>([]);
  const [readed, setReaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const auth = useRecoilValue(Authentication);

  const [page, setPage] = useState(1);
  const [dbPagination, setDbPagination] = useState<PaginationProps>({
    page: 0,
    pageCount: 0,
    pageSize: 0,
    total: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");

  function handleChangeValue(field: string, value: string) {
    return setTreatmentValues((prev) => ({ ...prev, [field]: value }));
  }

  const handleConclusion = () => {
    if (registerType === "Register") return handleSubmit();
    else return handleEditConclusion();
  };

  function handleCloseModal() {
    setTreatmentValues(defaultValues);
    setModalVisible(false);
    setTreatmentID("");
    return;
  }

  const handleSubmit = async () => {
    // let { price, name } = treatmentValues;
    // if (!price || !name)
    //   return alert("Por favor verificar os campos para o cadastro");
    // let priceNum = parseFloat(price.replace(".", "").replace(",", "."));
    // let data = { price: priceNum, name };
    // return await handleCreateTreatment(data).then(
    //   async (res: any) => {
    //     setModalVisible(false);
    //     setTreatmentValues(defaultValues);
    //     return await getTreatments(page);
    //   },
    //   (error) => console.log(error.response)
    // );
  };

  const getTreatments = useCallback(async (currPage?: number) => {
    // try {
    //   let res = await handleGetTreatments(currPage);
    //   if (res) {
    //     setReaded(true);
    //     setDbPagination(res.data.meta.pagination);
    //     setPage(res.data.meta.pagination.page);
    //     setTreatments(res.data.data);
    //     return;
    //   }
    // } catch (error: any) {
    //   if (error.response) console.log(error.response);
    // }
  }, []);

  const handleChangePage = (e: any, value: number) => {
    setPage(value);
    getTreatments(value);
  };

  async function handleEditModal(e: string) {
    setRegisterType("Edit");
    setModalVisible(true);
    setTreatmentID(e);

    // return await handleGetOneTreatment(e).then(
    //   (res) => {
    //     let attr = res.data.data.attributes;
    //     let { name, price } = attr;
    //     let priceStr = maskValue(price.toFixed(2));
    //     return setTreatmentValues({ name, price: priceStr });
    //   },
    //   (error) => console.log(error.response)
    // );
  }

  async function handleEditConclusion() {
    let { price, name } = treatmentValues;
    let priceNum = parseFloat(price.replace(".", "").replace(",", "."));

    let data = { price: priceNum, name };

    // return await handleEditTreatment(treatmentID, data).then(
    //   async () => {
    //     setModalVisible(false);
    //     setTreatmentID("");
    //     await getTreatments(page);
    //   },
    //   (error) => console.log(error.response)
    // );
  }

  const handleDeleteDoc = async (e: string) => {
    // return await handleDeleteTreatment(e).then(
    //   async (res) => await getTreatments(page),
    //   (error) => console.log(error.response)
    // );
  };

  useEffect(() => {
    if (!readed) getTreatments(0);
  }, [getTreatments, readed]);

  const handleFilterChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSearchButtonClick = async () => {
    // try {
    //   setIsLoading(true);
    //   setLoadingMessage("Buscando tratamentos cadastrados...");
    //   const result = await handleGetTreatmentsByName(searchTerm);
    //   setTreatments(result.data);
    //   setIsLoading(false);
    // } catch (error) {
    //   console.error("Erro ao buscar tratamentos:", error);
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    if (searchTerm === "") getTreatments(0);
  }, [searchTerm]);

  if (isLoading)
    return (
      <Box position="fixed" top={0} left={0} zIndex={200}>
        <Loading message={loadingMessage} />
      </Box>
    );

  return (
    <Box
      my={8}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      <CModal
        visible={modalVisible}
        closeModal={handleCloseModal}
        styles={{ borderRadius: "14px", minWidth: "80vw" }}
      >
        <Typography
          fontFamily={"Yantramanav"}
          fontWeight={500}
          variant="h4"
          color={COLORS.PRIMARY.MAIN}
        >
          Criar serviço
        </Typography>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Serviço"
              value={treatmentValues.name}
              sx={{ width: "100%" }}
              onChange={(e) => handleChangeValue("name", e.target.value)}
              onKeyDown={({ key }: any) => {
                if (key === "Enter") return handleConclusion();
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Valor do Serviço"
              value={treatmentValues.price}
              onChange={(e) =>
                handleChangeValue("price", maskValue(e.target.value))
              }
              sx={{ width: "100%" }}
              inputProps={{ maxLength: 10 }}
              onKeyDown={({ key }: any) => {
                if (key === "Enter") return handleConclusion();
              }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              label="Descrição do Serviço"
              value={treatmentValues.price}
              onChange={(e) =>
                handleChangeValue("price", maskValue(e.target.value))
              }
              sx={{ width: "100%" }}
              multiline
              rows={5}
              onKeyDown={({ key }: any) => {
                if (key === "Enter") return handleConclusion();
              }}
            />
          </Grid>
        </Grid>

        <Stack direction={"row"} justifyContent={"flex-end"} columnGap={2}>
          <Button
            sx={{ mt: 2, height: 42 }}
            color="primary"
            variant="outlined"
            title="Adicionar novo tratamento"
            onClick={() => handleConclusion()}
          >
            Cancelar
          </Button>
          <Button
            sx={{ mt: 2, height: 42 }}
            color="primary"
            variant="contained"
            title="Adicionar novo tratamento"
            onClick={() => handleConclusion()}
          >
            {registerType === "Register" ? "Criar" : "Editar"}
          </Button>
        </Stack>
      </CModal>

      <Stack direction="row" justifyContent="flex-end" width={"100%"} px={2}>
        <StyledButton
          variant="contained"
          title="Adicionar novo tratamento"
          sx={{
            textTransform: "capitalize",
            fontFamily: "Open Sans",
            fontWeight: 600,
          }}
          colors={["#003366", "#006DDB"]}
          onClick={() => {
            setRegisterType("Register");
            setModalVisible(true);
          }}
        >
          Criar Serviço
        </StyledButton>
      </Stack>

      {/* <SearchTreatments
        value={searchTerm}
        onChange={(filterValue) => handleFilterChange(filterValue)}
        onClick={handleSearchButtonClick}
      /> */}

      <Box mx={1} px={2} width={"100%"} mb={2}>
        <AdminEnterpriseServicesTable
          data={[]}
          onEdit={handleEditModal}
          onDelete={handleDeleteDoc}
          messageNothing="Não encontramos tratamentos cadastrados."
          titles={
            ["Teste"]
            // userData?.userType === "ADMIN"
            //   ? ["Código", "Tratamento", "Preço", "Editar", "Excluir"]
            //   : ["Código", "Tratamento", "Preço"]
          }
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
        {dbPagination.page !== 0 && (
          <Pagination
            page={page}
            size="small"
            onChange={handleChangePage}
            count={dbPagination.pageCount}
          />
        )}
      </Box>
    </Box>
  );
};

ServicesAdminEnterprise.getLayout = (page: React.JSX.Element) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default ServicesAdminEnterprise;
