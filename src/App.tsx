import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import Footer from "./components/Footer";
import FavoritePage from "./pages/FavoritePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

function App() {
  const [mode, setMode]:any = useState("light");


  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const setModeHandler = () =>
    mode === "light" ? setMode("dark") : setMode("light");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav setModeHandler={setModeHandler} />
        <Box
          sx={{
            height: "100vh",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Routes>
            <Route path="/" element={<CountriesPage />} />
            <Route
              path="/country/:name"
              element={<CountryPage />}
            />
            <Route path="/favorites" element={<FavoritePage />} />
          </Routes>
        </Box>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
