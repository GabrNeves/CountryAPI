import React from "react";
import { useState } from 'react';

import useCountries from "../custom-hooks/useCountries";
import { Link } from 'react-router-dom'

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
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

export default function CountryTableBody() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { countryData, error, loading } = useCountries(
    "https://restcountries.com/v3.1/all"
  );  

  const countrySearch = countryData?.filter((ctry) => ctry.name.common.toLowerCase().includes(keyword))

  if (error) return <div>Error!</div>;
  if (loading) return <CircularProgress disableShrink />;

  return (
    <TableBody>
      {countrySearch &&
        countrySearch
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.ccn3}>
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
                          return (
                            <Link to={`/country/${row.name.common}`} key={key}>
                              <p>{value[key]}</p>
                            </Link>
                          );
                        })
                      ) : column.id === "flag" ? (
                        <Link to={`/country/${row.name.common}`}>
                          <Avatar
                            heigth="40px"
                            width="40px"
                            justifycontent="center"
                            src={value}
                            alt="country flag"
                            sx={{ margin: "auto" }}
                          />
                        </Link>
                      ) : (
                        <Link to={`/country/${row.name.common}`}>
                          <p>{value}</p>
                        </Link>
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
  );
}
