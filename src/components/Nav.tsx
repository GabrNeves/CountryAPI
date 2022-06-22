import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { searchCountry } from '../redux/action'

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PublicIcon from '@mui/icons-material/Public';
import { AppState } from "../types";
import { useTheme } from "@mui/material/styles";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type SearchBarProps = {
  setModeHandler: () => void
}

export default function PrimarySearchAppBar({ setModeHandler }: SearchBarProps) {
  const theme = useTheme();
  //handle favorite cart
  const favoriteCart = useSelector((appState: AppState) => appState.favoriteReducer.favoriteCart);

  //handle filtering country
  const dispatch = useDispatch()
  const handleChange = (e: any) => {
    const value = e.target.value
    dispatch(searchCountry(value))
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to='/' className="logo"><PublicIcon /></Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={'Search country...'}
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", sm: "flex" }, marginRight: '4rem' }}>
            <IconButton
            aria-label='dark mode'
            color='inherit'
            onClick={setModeHandler}
            size='large'
            sx={{marginRight:'2rem'}}
            >
              {theme.palette.mode === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Link to="/favorites" >
                {(favoriteCart.map((products) => products).length === 0) ? <Badge badgeContent={favoriteCart.map((products) => products).length} color="error">
                  <FavoriteBorderIcon />
                </Badge> : <Badge badgeContent={favoriteCart.map((products) => products).length} color="error">
                  <FavoriteIcon />
                </Badge> }
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
