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
  Tooltip,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AdminEnterpriseServicesTable from "@/globals/_components/tables/admin/enterprise/services-table";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Authentication } from "@/globals/atoms/auth";
import { PaginationProps } from "../../../../../types";
import Loading from "@/globals/_components/loading";
import CModal from "@/globals/_components/custom-modal";
import { formatToBrl, maskValue } from "@/globals/utils/utils";
import { DashboardLayout } from "@/globals/layouts/dashboard/layout";
import { StyledButton } from "@/globals/_components/lp/enterprise/_components/header/banner";
import { COLORS } from "@/globals/utils/colors";
import { ServicesInterface } from "@/globals/types/enterprise";
import { TextBRLCustom } from "@/globals/_components/custom-textfields";
import axiosInstance from "@/globals/requests/axios";
import { ROUTES } from "@/globals/requests/routes";

const defaultValues: ServicesInterface = {
  name: "",
  description: "",
  price: undefined,
};

type RegisterType = "Register" | "Edit";

const ServicesAdminEnterprise = (props: any) => {
  const [serviceId, setServiceId] = useState("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [serviceValues, setServiceValues] = useState(defaultValues);
  const [registerType, setRegisterType] = useState<RegisterType>("Register");
  const [services, setServices] = useState<any[]>([]);
  const [readed, setReaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const auth = useRecoilValue(Authentication);
  const enterpriseId = auth?.me?.id;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<5 | 10 | 20 | 50 | 100>(5);
  const [dbPagination, setDbPagination] = useState<PaginationProps>({
    page: 0,
    totalPages: 0,
    pageSize: 0,
    totalItems: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const handleFilterChange = (value: string) => setSearchTerm(value);
  const handleChangePage = (e: any, pageIndex: number) => setPage(pageIndex);
  function handleChangeValue(field: string, value: any) {
    return setServiceValues((prev) => ({ ...prev, [field]: value }));
  }

  const handleConclusion = () => {
    if (registerType === "Register") return handleSubmit();
    else return handleEditConclusion();
  };

  function handleCloseModal() {
    setServiceValues(defaultValues);
    setModalVisible(false);
    setServiceId("");
    return;
  }

  const handleSubmit = async () => {
    let { price, name, description } = serviceValues;
    if (!price || !name)
      return alert("Por favor verificar os campos para o cadastro");
    let data = { price, name, description, enterpriseId };

    try {
      await axiosInstance.post(ROUTES.SERVICES.ADD_SERVICE, data);
      setModalVisible(false);
      setServiceValues(defaultValues);
      await getServices();
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const getServices = useCallback(
    async (currPage?: number) => {
      try {
        let { data, status } = await axiosInstance.get(
          ROUTES.ENTERPRISE.GET_SERVICES(
            enterpriseId,
            currPage?.toString() ?? page.toString(),
            pageSize.toString()
          )
        );
        if (status === 201) {
          setReaded(true);
          setDbPagination(data.pagination);
          setServices(data.services);
          return;
        }
      } catch (error: any) {
        if (error.response) console.log(error.response);
      }
    },
    [page]
  );

  async function handleEditModal(e: string) {
    setRegisterType("Edit");
    setModalVisible(true);
    setServiceId(e);

    try {
      const { data } = await axiosInstance.get(ROUTES.SERVICES.GET_UNIQUE(e));
      let { name, description, price } = data;
      setServiceValues({ name, price, description });
    } catch (error: any) {
      console.log(error.response);
    }
  }

  async function handleEditConclusion() {
    let { price, name, description } = serviceValues;
    let data = { price: price!, name, description };

    try {
      await axiosInstance.put(ROUTES.SERVICES.GET_UNIQUE(serviceId), data);
      setModalVisible(false);
      setServiceId("");
      await getServices(page);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  const handleDeleteDoc = async (e: string) => {
    try {
      await axiosInstance.delete(ROUTES.SERVICES.GET_UNIQUE(e));
      await getServices();
    } catch (error: any) {
      console.log(error.response);
    }
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
    if (!readed) getServices();
  }, [getServices, readed]);

  useEffect(() => {
    if (searchTerm === "") getServices();
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
          {registerType === "Register" ? "Criar serviço" : "Editar Serviço"}
        </Typography>
        <Grid container spacing={2} mt={0.5}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Serviço"
              value={serviceValues.name}
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
              value={serviceValues.price?.toString()}
              onChange={(e) =>
                handleChangeValue(
                  "price",
                  parseFloat(
                    e.target.value
                      .replaceAll("R$ ", "")
                      .replaceAll(".", "")
                      .replaceAll(",", ".")
                  )
                )
              }
              sx={{ width: "100%" }}
              InputProps={{ inputComponent: TextBRLCustom as any }}
              onKeyDown={({ key }: any) => {
                if (key === "Enter") return handleConclusion();
              }}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              label="Descrição do Serviço"
              value={serviceValues.description}
              onChange={(e) => handleChangeValue("description", e.target.value)}
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
          <Tooltip title="Cancelar">
            <Button
              sx={{ mt: 2, height: 42 }}
              color="primary"
              variant="outlined"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </Tooltip>
          <Tooltip
            title={
              registerType === "Register"
                ? "Adicionar novo Serviço"
                : "Atualizar Serviço"
            }
          >
            <Button
              sx={{ mt: 2, height: 42 }}
              color="primary"
              variant="contained"
              onClick={handleConclusion}
            >
              {registerType === "Register" ? "Criar" : "Editar"}
            </Button>
          </Tooltip>
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
          data={services}
          onEdit={handleEditModal}
          onDelete={handleDeleteDoc}
          messageNothing="Não encontramos serviços cadastrados."
          titles={[
            "Nome do Serviço",
            "Descrição do Serviço",
            "A partir R$",
            "Ações",
          ]}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
        {dbPagination.page !== 0 && (
          <Pagination
            page={page}
            size="small"
            onChange={handleChangePage}
            count={dbPagination.totalItems}
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
