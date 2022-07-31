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

  const [countryEntry, setCountryEntry] = useState('')

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true)
      const res = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(res.data.sort((a, b) => a.name.common > b.name.common ? 1 : -1))
      setLoading(false)
    }

    getCountries()
  }, [])

  const lastCountryIndex = currentPage * countriesPerPage
  const firstCountryIndex = lastCountryIndex - countriesPerPage
  // const currentCountries = countries.slice(firstCountryIndex, lastCountryIndex)
  const filteredCountries = (countryEntry) ?
    countries.filter(country => {
      return country.name.common.toLowerCase().includes(countryEntry.toLowerCase())
    })
    : 
    countries
  const currentCountries = filteredCountries.slice(firstCountryIndex, lastCountryIndex)

  const paginate = currentPage => setCurrentPage(currentPage)
  const prevPage = () => {
    const page = (prev => (prev - 1) >= 1 ? prev - 1 : prev)
    setCurrentPage(page)
  }
  const nextPage = () => {
    const page = (prev => (prev + 1) <= Math.ceil(countries.length / countriesPerPage) ? prev + 1 : prev)
    setCurrentPage(page)
  }

  return (
    <>
        <div className="container mt-5">
          <h1 className="text-primary">Countries</h1>

          <div className="form">
            <form className="search__form">
              <input
                type="text"
                placeholder="Search the country"
                className="search__input"
                onChange={e => setCountryEntry(e.target.value)}
              />
            </form> 
          </div>
          {/* <div className="form">
            <form className="search__form">
              <input
                type="text"
                placeholder="Search the country"
                className="search__input"
                onChange={e => setCountryEntry(e.target.value)}
              />
              <ul className="autocomplete">
                <li className="autocomplete__item">Item</li>
                <li className="autocomplete__item">Item</li>
                <li className="autocomplete__item">Item</li>
              </ul>
            </form> 
          </div> */}
          <Countries 
            countries={currentCountries} 
            loading={loading}/> 
        </div>

        <Pagination 
          countriesPerPage={countriesPerPage} 
          totalCountriesToShow={filteredCountries.length}
          paginate={paginate} />
      
        <div>
            <div className="btn btn-primary" onClick={prevPage}>Prev Page</div>
            <div className="btn btn-primary ms-2" onClick={nextPage}>Next Page</div>
        </div>
      </>
  );
}

export default App;