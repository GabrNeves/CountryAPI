import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/action";
import CountryTableHead from "../tableComponents/CountryTableHead";
import CountryTableBody from "../tableComponents/CountryTableBody";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

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
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const theme = useTheme();

  const countryData = useSelector(
    (appState) => appState.dataReducer.countriesData
  );

  const loading = useSelector((appState) => appState.dataReducer.loading);
  const error = useSelector((appState) => appState.dataReducer.error);

  const favoriteCart = useSelector(
    (appState) => appState.favoriteReducer.favoriteCart
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (error) return <div>Error!</div>;
  if (loading)
    return (
      <CircularProgress
        disableShrink
        sx={{ position: "absolute", left: "50vw", top: "50vh" }}
      />
    );
  return (
    <div style={{paddingTop: '5rem'}}>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "absolute",
          right: 10,
          top: 70,
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          boxShadow: 1,
          color: theme.palette.text.primary,
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Link to="/favorites">
            {favoriteCart.map((products) => products).length === 0 ? (
              <Badge
                badgeContent={favoriteCart.map((products) => products).length} 
              >
                <FavoriteBorderIcon />
              </Badge>
            ) : (
              <Badge
                badgeContent={favoriteCart.map((products) => products).length}
              >
                <FavoriteIcon />
              </Badge>
            )}
          </Link>
        </IconButton>
      </Box>
      <Paper
        sx={{ width: "90%", overflow: "hidden", margin: 'auto' }}
      >
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <CountryTableHead columns={columns} />
            <CountryTableBody
              columns={columns}
              countrySearch={countryData}
              error={error}
              loading={loading}
              page={page}
              rowsPerPage={rowsPerPage}
              countryData={countryData}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countryData ? countryData.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
