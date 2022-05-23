import React from "react";
import useCountry from "../custom-hooks/useCountry";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CountriesPage({ country }) {
  const { name } = useParams();
  const { countryData, error, loading } = useCountry(name);

  if (error) return <div>Error!</div>;
  if (loading) return <CircularProgress disableShrink />;
  return (
    <div>
      <h1>{name}</h1>
      {countryData ? (
        countryData.map((country) => {
          return (
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="140"
                image={country.flags.png}
                alt={country.name.common + " flag"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Other Names
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {country.name.common}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Region
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {country.region}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Borders
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {country.borders}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  Currencies
                </Typography>
                {country.currencies && Object.keys(country.currencies).map((key) => {
                      return (
                        <Typography variant="body2" color="text.secondary" key={country.cca3 + key}>
                            {country.currencies[key].name}
                        </Typography>    
                      )
                  })}
                <Typography gutterBottom variant="h5" component="div">
                  Languages
                </Typography>
                
                  {country.languages && Object.keys(country.languages).map((key) => {
                      return (
                        <Typography variant="body2" color="text.secondary" key={country.cca3 + key}>
                            {country.languages[key]}
                        </Typography>    
                      )
                  })}
                
              </CardContent>
              <CardActions sx={{justifyContent: "center"}}>
                <Button size="small">
                  <Link to="/" >Back</Link>
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
