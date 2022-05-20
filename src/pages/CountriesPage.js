import * as React from "react";
import useCountries from "../custom-hooks/useCountries";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

// import { BrowserRouter as Router, Link } from 'react-router-dom';

const columns = [
  {
    id: "flag",
    label: "Flag",
    minWidth: 170,
    align: "center",
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "region", label: "Region", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "languages",
    label: "Languages",
    minWidth: 170,
    align: "right",
  },
  {
    id: "capital",
    label: "capital",
    minWidth: 170,
    align:"right"
  },
];

export default function CountriesPage() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { countryData, error, loading } = useCountries(
    "https://restcountries.com/v3.1/all"
  );

  if (error) return <div>Error!</div>;
  if (loading) return <CircularProgress disableShrink />
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {countryData &&
                countryData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.ccn3}
                      >
                        {columns.map((column) => {
                          let value;
                          switch (column.id) {
                            case "name":
                              value = row.name.common;
                              break;
                            case "flag":
                              value = row.flags.png;
                              break;
                            case "languages":
                              value = row.languages;
                              break;
                            case "region":
                            case "capital":
                            case "population":
                              value = row[column.id] || "NO DATA";
                              break;
                            default:
                              value = null;
                          }

                          return value ? (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "languages" ? (
                                Object.keys(value).map((key) => {
                                  return <p key={key}>{value[key]}</p>;
                                })
                              ) : column.id === "flag" ? (
                                <Avatar
                                  heigth="40px"
                                  width="40px"
                                  justifycontent="center"
                                  src={value}
                                  alt="country flag"
                                  sx={{ margin: "auto" }}
                                />
                              ) : (
                                <p>{value}</p>
                              )}
                            </TableCell>
                          ) : (
                            <></>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countryData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
