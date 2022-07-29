import React from 'react'

export default function Pagination({countriesPerPage, totalCountries, paginate}) {
    const pageNumbers = []
    for (let i=1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

  return (
    <div>
        <ul className="pagination">
            {
                pageNumbers.map(num => (
                    <li key={num} className="page-item">
                        <a 
                            href="!#" 
                            className="page-link"
                            onClick={() => paginate(num)}>
                        {num}
                        </a>
                    </li>
                ) )
            }
        </ul>
    </div>
  )
}
