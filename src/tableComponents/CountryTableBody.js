import React from "react";
import { Link } from "react-router-dom";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

export default function CountryTableBody({
  columns,
  countrySearch,
  error,
  loading,
  page,
  rowsPerPage,
}) {
  if (error) return <div>Error!</div>;
  if (loading)
    return (
      <CircularProgress
        disableShrink
        sx={{ position: "absolute", left: "50vw", top: "50vh" }}
      />
    );

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
