import React from 'react'
import '../App.css';

export default function Countries({countries, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
  return (
    <ul>
        {
            countries.map((country, i) => (
                <li key={country.name.common} 
                    className="list-group-item list-group-item-action list-group-item-info">
                    <div style={{padding: 10, flex: 1 }}>
                        {i+1} {country.name.common}
                        {country.capital}
                        <img src={country.flags.png} alt="flag" 
                            className="search__img"
                            style={{width:50}}/>
                    </div>
                </li>
            ))
        }
    </ul>
  )
}
