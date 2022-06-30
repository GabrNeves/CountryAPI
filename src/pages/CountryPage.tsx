import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from "../redux/action";

import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import BorderBottomIcon from "@mui/icons-material/BorderBottom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import TranslateIcon from "@mui/icons-material/Translate";
import { AppState } from "../types";
import { useTheme } from "@mui/material/styles";



export default function CountriesPage() {
  const theme = useTheme();
  const { name } = useParams();

  const dispatch = useDispatch<any>();
  const { country: countryData, error, loading } = useSelector((appState: AppState) => appState.dataReducer)

  useEffect(() => {
    if (name) {
      dispatch(fetchCountry(name))
    }
  }, [dispatch, name])

  const [openOtherNames, setOpenOtherNames] = React.useState(false);
  const [openRegion, setOpenRegion] = React.useState(false);
  const [openBorders, setOpenBorders] = React.useState(false);
  const [openCurrencies, setOpenCurrencies] = React.useState(false);
  const [openLanguages, setOpenLanguages] = React.useState(false);

  const handleClickOtherNames = () => {
    setOpenOtherNames(!openOtherNames);
  };

  const handleClickRegion = () => {
    setOpenRegion(!openRegion);
  };

  const handleClickBorders = () => {
    setOpenBorders(!openBorders);
  };

  const handleClickCurrencies = () => {
    setOpenCurrencies(!openCurrencies);
  };

  const handleClickLanguages = () => {
    setOpenLanguages(!openLanguages);
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
      <Typography variant='h2' sx={{margin:'0', padding: '4rem 0', color: theme.palette.text.primary}} >{name}</Typography>
      {countryData ? (
        countryData.map((country) => {
          return (
            <div key={country.cca3 + country.cca3}>
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
                    <ListItemButton onClick={handleClickOtherNames}>
                      <ListItemIcon>
                        <BadgeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Other Names" />
                      {openOtherNames ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openOtherNames} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={country.name.common} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClickRegion}>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary="Region" />
                      {openRegion ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openRegion} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText primary={country.region} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClickBorders}>
                      <ListItemIcon>
                        <BorderBottomIcon />
                      </ListItemIcon>
                      <ListItemText primary="Borders" />
                      {openBorders ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openBorders} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4, flexDirection: 'column' }}>
                          <ListItemText primary={country.borders ? country.borders : <>NO BORDERS</>}/>
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClickCurrencies}>
                      <ListItemIcon>
                        <CurrencyExchangeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Currencies" />
                      {openCurrencies ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openCurrencies} timeout="auto" unmountOnExit>
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
                                    {country.currencies[key].name ? country.currencies[key].name : <>NO CURRENCY</>}
                                  </Typography>
                                );
                              })
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItemButton onClick={handleClickLanguages}>
                      <ListItemIcon>
                        <TranslateIcon />
                      </ListItemIcon>
                      <ListItemText primary="Languages" />
                      {openLanguages ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openLanguages} timeout="auto" unmountOnExit>
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
                <CardActions ></CardActions>
              </Card>
              <Link to="/">
                <Button variant="contained" sx={{ marginTop: "2rem", marginBottom: '4rem' }}>
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
