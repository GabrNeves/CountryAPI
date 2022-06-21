import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../redux/action";
// import CountryTableHead from "../tableComponents/CountryTableHead";
import CountryTableBody from "../tableComponents/CountryTableBody";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { AppState } from "../types";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
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

type Column = {
  id: string,
  label: string,
  numeric?: boolean,
  minWidth: number,
  align?: 'center' | 'right' | 'left' | 'top' | 'bottom' | any,
  format?: (value: number) => void;
}

const columns: readonly Column[] = [
  {
    id: "flag",
    label: "Flag",
    numeric: false,
    minWidth: 170,
    align: "center",
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "region", label: "Region", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    numeric: true,
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "languages",
    label: "Languages",
    numeric: false,
    minWidth: 170,
    align: "right",
  },
  {
    id: "capital",
    label: "capital",
    numeric: false,
    minWidth: 170,
    align: "right",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Column) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Column) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sortDirection={orderBy === column.id ? order : false}
            width = {column.minWidth}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : "asc"}
              onClick={createSortHandler(column.id)}
              
            >
              {column.label}
              {orderBy === column.id ? (
                <Box component="span" sx={visuallyHidden} >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width = "170"> </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function CountriesPage() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Column>('name');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Column,
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

  // const countryData = useSelector(
  //   (appState) => appState.dataReducer.filteredCountry
  // );
  const {filteredCountry, loading, error} = useSelector((appState: AppState) => appState.dataReducer)

  // const loading = useSelector((appState) => appState.dataReducer.loading);
  // const error = useSelector((appState) => appState.dataReducer.error);

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
            {/* <CountryTableHead columns={columns}/> */}
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