import './App.css'
import {Routes, Route} from 'react-router-dom'
import CountriesPage from './pages/CountriesPage'

function App() {
  return <div className='App'>
    <Routes>
      <Route path='/' element={<CountriesPage />}/>
    </Routes>
  </div>
}

export default App
