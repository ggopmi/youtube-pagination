import React from 'react'

export default function Countries({countries, loading}) {
    if(loading){
        return <h2>Loading...</h2>
    }
  return (
    <ul className="list-group mt-2">
        {
            countries.map((country, i) => (
                <li key={country.name.common} 
                    className="list-group-item">
                    <div style={{padding: 10, flex: 1 }}>
                        {i+1} {country.name.common}
                        {country.capital}
                        <img src={country.flags.png} alt="flag" style={{width:25}}/>
                    </div>
                </li>
            ))
        }
    </ul>
  )
}
