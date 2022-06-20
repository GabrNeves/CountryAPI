import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import Footer from "./components/Footer";
import FavoritePage from "./pages/FavoritePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from '@mui/material/Box'


function App() {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#64732F',
        light: '#CAD959',
        dark: '#334018'
      } ,
    },
  });

  const setModeHandler = () =>
    mode === "light" ? setMode("dark") : setMode("light");

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <Nav theme={theme} setModeHandler={setModeHandler} />
          <Box sx={{ height: '100vh', backgroundColor: theme.palette.background.paper}}>
            <Routes>
              <Route path="/" element={<CountriesPage theme={theme}/>} />
              <Route path="/country/:name" element={<CountryPage theme={theme} />} />
              <Route path="/favorites" element={<FavoritePage theme={theme}/>} />
            </Routes>
          </Box>
          <Footer />
        </ThemeProvider>
    </div>
  );
}

export default App;
