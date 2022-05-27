import "./App.css";
// import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import CountriesPage from "./pages/CountriesPage";
import CountryPage from "./pages/CountryPage";
import Nav from './components/Nav'

// export const AppContext = createContext()

function App() {
  return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<CountriesPage />} />
          <Route path="/country/:name" element={<CountryPage />} />
        </Routes>
      </div>
  );
}

export default App;
