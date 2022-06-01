import "./App.css";
// import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import FavoritePage from "./pages/FavoritePage";
import Nav from './components/Nav'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react'
import { useSelector } from "react-redux";







function App() {

  const themeSelector = useSelector((appState) => appState.darkModeReducer)

  const theme = createTheme({
    themeSelector
  });

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <Nav />
          <Routes>
            <Route path="/" element={<CountriesPage />} />
            <Route path="/country/:name" element={<CountryPage />} />
            <Route path='/favorites' element={<FavoritePage />}/>
          </Routes>
        </ThemeProvider>
      </div>
  );
}

export default App;
