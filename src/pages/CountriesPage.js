import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useCountries from "../custom-hooks/useCountries";
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
  if (loading) return <h1>Loading...</h1>;
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
                          if (column.id === "name") {
                            value = row.name.common;
                          } else if (column.id === "flag") {
                            value = row.flags.png;
                          } else if (column.id === "languages") {
                            value = row.languages;
                          } else if (
                            column.id === "region" ||
                            column.id === "capital" ||
                            column.id === "population"
                          ) {
                            value = row[column.id] || "NO DATA";
                          } else {
                            value = null;
                          }

                          return value ? (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "languages" ? (
                                Object.keys(value).map((key) => {
                                  return <p key={key}>{value[key]}</p>;
                                })
                              ) : column.id === "flag" ? (
                                <img
                                  heigth="35px"
                                  width="35px"
                                  src={value}
                                  alt="flag"
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
