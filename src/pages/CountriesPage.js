import * as React from "react";
import { useState } from 'react';

import useCountries from "../custom-hooks/useCountries";
import CountryTableHead from "../tableComponents/CountryTableHead";
import CountryTableBody from '../tableComponents/CountryTableBody'

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";


export default function CountriesPage() {
  const [keyword, setKeyword] = useState('');
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

  const handleSearch = (e) => {
      setKeyword(e.target.value)
    }

  const countrySearch = countryData?.filter((ctry) => ctry.name.common.toLowerCase().includes(keyword))

  if (error) return <div>Error!</div>;
  if (loading) return <CircularProgress disableShrink />;
  return (
    <div>
      <input placeholder='Search country...' onChange={handleSearch}></input>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <CountryTableHead/>
            <CountryTableBody/>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countrySearch.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
