import React from "react";
import { Link } from "react-router-dom";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { AppState, Column, Country } from "../types";



export default function CountryTableBody({
  columns,
  countryData,
  error,
  loading,
  page,
  rowsPerPage,
  stableSort,
  getComparator,
  order,
  orderBy,
}: any) {
  const dispatch = useDispatch();
  const handleAddFavorite = (favorite: Country) => {
    dispatch(addFavorite(favorite));
  };
  const handleRemoveFavorite = (favorite: Country) => {
    dispatch(removeFavorite(favorite));
  };
  const favoriteCart = useSelector(
    (appState: AppState) => appState.favoriteReducer.favoriteCart
  );
  
  
  if (error) return <div>Error!</div>;
  if (loading) {
    return (
      <CircularProgress
      disableShrink
      sx={{ position: "absolute", left: "50vw", top: "50vh" }}
      />
      );
    }
    return (
      <TableBody>
      {countryData &&
        stableSort(countryData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row: Country) => {
          const favCheck = favoriteCart.some((item) => {
            return row.name.common === item.name.common
          })
          
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.cca3}>
                {columns.map((column: Column) => {
                  let value: any;
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
                            <Link
                              to={`/country/${row.name.common}`}
                              key={key + row.name.common}
                            >
                              <p>{value[key]}</p>
                            </Link>
                          );
                        })
                      ) : column.id === "flag" ? (
                        <Link to={`/country/${row.name.common}`}>
                          <Avatar
                            src={value}
                            alt="country flag"
                            sx={{ margin: "auto", heigth:"40px", width:"40px", justifyContent: 'center' }}
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
                <TableCell>

                  {favoriteCart.indexOf(row) >= 0 ? (
                    <IconButton
                      sx={{ background: "transparent", border: "none" }}
                      onClick={() =>
                        favCheck
                          ? handleRemoveFavorite(row)
                          : handleAddFavorite(row)
                      }
                    >
                      {favCheck ? <FavoriteIcon sx={{ color: "#C51104" }} /> : <FavoriteBorderIcon /> }
                      
                    </IconButton>
                  ) : (
                    <IconButton
                      sx={{ background: "transparent", border: "none" }}
                      onClick={() => favCheck
                        ? handleRemoveFavorite(row)
                        : handleAddFavorite(row)}
                    >
                      {!favCheck ? <FavoriteBorderIcon /> : <FavoriteIcon sx={{ color: "#C51104" }} /> }
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
    </TableBody>
  );
}
