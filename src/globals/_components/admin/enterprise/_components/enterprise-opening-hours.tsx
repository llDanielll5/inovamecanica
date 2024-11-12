import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { TextHourCustom } from "@/globals/_components/custom-textfields";
import styled from "@emotion/styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface OpeningHours {
  title: string;
  isActive: boolean;
  moreHours?: boolean;
  startHour?: Date;
  endHour?: Date;
  startLaunch?: Date;
  endLaunch?: Date;
}

export const EnterpriseOpeningHoursData = (props: {
  onUpdateValues: (openingValues: OpeningHours[]) => void;
}) => {
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([
    {
      title: "Domingo",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Segunda",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Terça",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Quarta",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Quinta",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Sexta",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
    {
      title: "Sábado",
      isActive: false,
      startHour: undefined,
      endHour: undefined,
      endLaunch: undefined,
      startLaunch: undefined,
    },
  ]);

  const handleChange = (index: number, checked: boolean) => {
    const cloneOpenings = [...openingHours];
    const finding = cloneOpenings.find((a, i) => i === index)!;
    finding.isActive = checked;
    setOpeningHours(cloneOpenings);
  };
  const handleAddMoreHours = (index: number) => {
    const cloneOpenings = [...openingHours];
    const finding = cloneOpenings.find((a, i) => i === index)!;
    finding.moreHours = !finding.moreHours;
    setOpeningHours(cloneOpenings);
  };

  useEffect(() => {
    props.onUpdateValues(openingHours);
  }, [openingHours]);

  return (
    <OpeningHoursContainer>
      {openingHours.map((item, index) => (
        <OpeningSingle key={index}>
          <Switch
            checked={item.isActive}
            onChange={(_, c) => handleChange(index, c)}
          />
          <Typography fontFamily={"Open Sans"} fontWeight={600} width={"10%"}>
            {item.title}
          </Typography>

          {item.isActive && (
            <>
              <TextField
                InputProps={{ inputComponent: TextHourCustom as any }}
                label="Hora Início*"
              />
              <Typography>-</Typography>
              <TextField
                InputProps={{ inputComponent: TextHourCustom as any }}
                label="Hora Término/Almoço*"
              />

              {!item.moreHours && (
                <Button
                  sx={{
                    color: "#006DDB",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans",
                    fontWeight: 700,
                  }}
                  variant="text"
                  onClick={() => handleAddMoreHours(index)}
                >
                  Adicionar horário
                </Button>
              )}

              {item.moreHours && (
                <>
                  <TextField
                    InputProps={{ inputComponent: TextHourCustom as any }}
                    label="Hora Retorno*"
                  />
                  <Typography>-</Typography>
                  <TextField
                    InputProps={{ inputComponent: TextHourCustom as any }}
                    label="Fim do Expediente*"
                  />
                  <IconButton onClick={() => handleAddMoreHours(index)}>
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </>
              )}
            </>
          )}
        </OpeningSingle>
      ))}
    </OpeningHoursContainer>
  );
};

const OpeningHoursContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
const OpeningSingle = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  column-gap: 20px;
`;
