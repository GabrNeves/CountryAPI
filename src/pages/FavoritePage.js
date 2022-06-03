import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../redux/action";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';

export default function FavoritePage() {
  const favoriteCountry = useSelector(
    (appState) => appState.favoriteReducer.favoriteCart
  );
  const theme = useTheme();

  const dispatch = useDispatch();
  const handleRemoveFavorite = (favorite) => {
    dispatch(removeFavorite(favorite));
  };

  return (
    <div>
      <Typography variant='h3' sx={{padding: '4rem', color:theme.palette.text.primary}}>Here's your selected favorite countries</Typography>
      {favoriteCountry ? (
        favoriteCountry.map((country) => {
          return (
            <Card
              sx={{ display: "flex", margin: "1rem auto", maxWidth: "70vw" }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={country.flags.png}
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {country.name.common}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {country.region}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "end", pl: 1, pb: 1 }}>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFavorite(country)}
                  >
                    {theme.direction === "rtl" ? (
                      <DeleteIcon />
                    ) : (
                      <DeleteIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </Card>
          );
        })
      ) : (
        <h2>There is no data yet.</h2>
      )}
      <Link to="/"><Button variant="contained">Back</Button></Link>
    </div>
  );
}
