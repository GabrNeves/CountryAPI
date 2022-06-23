import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/action";
import { Link } from "react-router-dom";
import CountryTableBody from "../tableComponents/CountryTableBody";
import EnhancedTableHead from '../tableComponents/CountryTableHead'
import { AppState, Country, Order } from "../types";
import { columns } from "./columns";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";

function descendingComparator(a: Country, b: Country, orderBy: keyof Country) {

  
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: Order,
  orderBy: keyof Country,
)  {
  return order === 'desc'
    ? (a: Country, b: Country) => descendingComparator(a, b, orderBy)
    : (a: Country, b: Country) => -descendingComparator(a, b, orderBy);
}

//IE11 support
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function CountriesPage() {
  const dispatch = useDispatch<any>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('name');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const theme = useTheme();

  const {filteredCountry, loading, error} = useSelector((appState: AppState) => appState.dataReducer)

  const favoriteCart = useSelector(
    (appState: AppState) => appState.favoriteReducer.favoriteCart
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
    <div style={{ paddingTop: "5rem" }}>
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
      <Paper sx={{ width: "90%", overflow: "hidden", margin: "auto" }}>
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredCountry.length}
            />
            <CountryTableBody
              columns={columns}
              error={error}
              loading={loading}
              page={page}
              rowsPerPage={rowsPerPage}
              countryData={filteredCountry}
              stableSort={stableSort}
              getComparator={getComparator}
              order={order}
              orderBy={orderBy}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCountry ? filteredCountry.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
