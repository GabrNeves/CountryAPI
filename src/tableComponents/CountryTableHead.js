import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

export default function CountryTableHead({ columns }) {
  return (
    <TableHead sx={{ backgroudColor: "black" }}>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            <TableSortLabel>
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>
          <TableSortLabel></TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
