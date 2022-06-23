import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from '@mui/utils';
import Box from "@mui/material/Box";
import { EnhancedTableProps } from "../types";
import { columns } from "../pages/columns";

export default function EnhancedTableHead({order, orderBy, onRequestSort}: EnhancedTableProps) {
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns?.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            width = {column.minWidth}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
              
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden} >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width = "170"> </TableCell>
      </TableRow>
    </TableHead>
  );
}
