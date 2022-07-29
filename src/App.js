import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Countries from './components/Countries'
import Pagination from './components/Pagination'

function App() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [countriesPerPage] = useState(10)

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true)
      const res = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(res.data.sort((a, b) => a.name.common > b.name.common ? 1 : -1))
      setLoading(false)
    }

    getCountries()
  }, [])

  const lastCountryIndex = currentPage * countriesPerPage + 1
  const firstCountryIndex = lastCountryIndex - countriesPerPage
  const currentCountries = countries.slice(firstCountryIndex, lastCountryIndex)

  const paginate = currentPage => setCurrentPage(currentPage)
  const prevPage = () => {
    setCurrentPage(prev => (prev - 1) >= 1 ? prev - 1 : prev)
  }
  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) <= Math.ceil(countries.length / countriesPerPage) ? prev + 1 : prev)
  }

  return (
    <>
        <div className="container mt-5">
          <h1 className="text-primary">Countries</h1>
          <Countries 
            countries={currentCountries} 
            loading={loading}/> 
        </div>
        <Pagination 
          countriesPerPage={countriesPerPage} 
          totalCountries={countries.length}
          paginate={paginate} />
      
        <div>
            <div className="btn btn-primary" onClick={prevPage}>Prev Page</div>
            <div className="btn btn-primary ms-2" onClick={nextPage}>Next Page</div>
        </div>
    </>
  );
}

export default App;