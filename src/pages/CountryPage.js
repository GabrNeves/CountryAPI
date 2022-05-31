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

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import BorderBottomIcon from "@mui/icons-material/BorderBottom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TranslateIcon from "@mui/icons-material/Translate";

export default function CountriesPage({ country }) {
  const { name } = useParams();
  const { countryData, error, loading } = useCountry(name);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };


  const handleClick3 = () => {
    setOpen3(!open3);
  };


  const handleClick4 = () => {
    setOpen4(!open4);
  };


  const handleClick5 = () => {
    setOpen5(!open5);
  };


  if (error) return <div>Error!</div>;
  if (loading)
    return (
      <CircularProgress
        disableShrink
        sx={{ position: "absolute", left: "50vw", top: "50vh" }}
      />
    );
  return (
    <div>
      <h1 style={{ marginTop: "7rem" }}>{name}</h1>
      {countryData ? (
        countryData.map((country) => {
          return (
            
            <div>
              <Card sx={{ maxWidth: 345, margin: "auto" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={country.flags.png}
                  alt={country.name.common + " flag"}
                />
                <CardContent>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton onClick={handleClick}>
                      <ListItemIcon>
                        <BadgeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Other Names" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={country.name.common} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick2}>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary="Region" />
                      {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={country.region} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick3}>
                      <ListItemIcon>
                        <BorderBottomIcon />
                      </ListItemIcon>
                      <ListItemText primary="Borders" />
                      {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, flexDirection: 'column' }}>
                          <ListItemText primary={country.borders ? country.borders : <>NO BORDERS</>}/>
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick4}>
                      <ListItemIcon>
                        <CurrencyExchangeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Currencies" />
                      {open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary={
                              country.currencies &&
                              Object.keys(country.currencies).map((key) => {
                                return (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    key={country.cca3 + key}
                                  >
                                    {country.currencies[key]}
                                  </Typography>
                                );
                              })
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClick5}>
                      <ListItemIcon>
                        <TranslateIcon />
                      </ListItemIcon>
                      <ListItemText primary="Languages" />
                      {open5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open5} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary={
                              country.languages &&
                              Object.keys(country.languages).map((key) => {
                                return (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    key={country.cca3 + key}
                                  >
                                    {country.languages[key]}
                                  </Typography>
                                );
                              })
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}></CardActions>
              </Card>
              <Link to="/">
                <Button variant="contained" sx={{ marginTop: "2rem" }}>
                  Back
                </Button>
              </Link>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
