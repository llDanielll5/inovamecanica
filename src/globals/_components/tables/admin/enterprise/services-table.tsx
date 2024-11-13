import * as React from "react";
import * as S from "../../styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useRecoilValue } from "recoil";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Authentication } from "@/globals/atoms/auth";

interface TableProps {
  titles: string[];
  data: TableDataProps[];
  onEdit: (e: any) => void;
  onDelete: (e: any) => void;
  messageNothing?: string;
}

export interface TableDataProps {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function AdminEnterpriseServicesTable(props: TableProps) {
  const { titles, data, onDelete, onEdit, messageNothing } = props;
  const auth = useRecoilValue(Authentication);
  const rows: TableDataProps[] = [];

  return (
    <S.StyledTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles.map((item, index) => {
              return (
                <S.StyledTable key={index}>
                  <Typography
                    fontFamily={"Open Sans"}
                    fontWeight={600}
                    color="#8B8B8B"
                  >
                    {item}
                  </Typography>
                </S.StyledTable>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => {
            let id = row.id.toString();

            return (
              <TableRow key={index}>
                <TableCell>
                  <Typography fontFamily={"Open Sans"} fontWeight={600}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontFamily={"Open Sans"} fontWeight={600}>
                    {row.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontFamily={"Open Sans"} fontWeight={600}>
                    {row?.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onEdit(id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {data?.length === 0 && (
        <S.NotHaveFiscalContainer>
          <Typography variant="subtitle1">{messageNothing}</Typography>
        </S.NotHaveFiscalContainer>
      )}
    </S.StyledTableContainer>
  );
}
