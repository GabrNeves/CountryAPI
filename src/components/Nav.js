import * as React from "react";
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
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';



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



export default function PrimarySearchAppBar({ theme, darkModeHandler }) {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch()
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  const countryData = useSelector((appState) => appState.dataReducer.countriesData)
  const favoriteCart = useSelector((appState) => appState.favoriteReducer.favoriteCart)
  const countrySearch = countryData?.filter((ctry) =>
  ctry.name.common.toLowerCase().includes(keyword)
);

  // const userInput = useSelector((appState) => appState.State.searchReducer.search)

  // useEffect(() => {
  //   dispatch(searchCountry(userInput.userInput))}, [userInput.userInput, dispatch])

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
            <Link to='/' className="logo">LOGO</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={'Search country...'}
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, marginRight: '4rem' }}>
            <IconButton
            aria-label='dark mode'
            color='inherit'
            onClick={darkModeHandler}
            size='large'
            sx={{marginRight:'2rem'}}
            >
              <DarkModeIcon />
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
