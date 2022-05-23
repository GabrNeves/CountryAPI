import './App.css'
import {Routes, Route} from 'react-router-dom'
import CountriesPage from './pages/CountriesPage'
import CountryPage from './pages/CountryPage'

function App() {
  return <div className='App'>
    <Routes>
      <Route path='/' element={<CountriesPage />}/>
      <Route path="/country/:name" element={<CountryPage />}/>
    </Routes>
  </div>
}

export default App
