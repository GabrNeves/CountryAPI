import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from "../redux/action";
// import useCountries from "../custom-hooks/useCountries";
import CountryTableHead from "../tableComponents/CountryTableHead";

import CountryTableBody from "../tableComponents/CountryTableBody";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";

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
    format: (value) => value.toLocaleString("en-US"),
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
    align: "right",
  },
];


export default function CountriesPage() {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const { countryData, error, loading } = useCountries(
  //   "https://restcountries.com/v3.1/all"
  // );

  const countryData = useSelector((appState) => appState.dataReducer.countriesData)
  const loading = useSelector((appState) => appState.dataReducer.loading)
  const error = useSelector((appState) => appState.dataReducer.error)

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const countrySearch = countryData?.filter((ctry) =>
    ctry.name.common.toLowerCase().includes(keyword) || ctry.region.toLowerCase().includes(keyword)
  );

  useEffect(()=> {
    dispatch(fetchCountries())
  }, [dispatch])

  if (error) return <div>Error!</div>;
  if (loading)
    return (
      <CircularProgress
        disableShrink
        sx={{ position: "absolute", left: "50vw", top: "50vh" }}
      />
    );
  return (
    <div>
      <input placeholder="Search country..." onChange={handleSearch}></input>
      <Paper sx={{ width: "90%", overflow: "hidden", margin:'5rem auto 0 auto' }}>
        <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <CountryTableHead columns={ columns } />
            <CountryTableBody columns={ columns } countrySearch={ countrySearch } error={ error } loading={ loading } page={ page } rowsPerPage={ rowsPerPage }/>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countrySearch ? countrySearch.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
