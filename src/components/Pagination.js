import React from 'react'

export default function Pagination({
        countriesPerPage, 
        totalCountriesToShow, 
        paginate
    }) {
        console.log('totalCountriesToShow', totalCountriesToShow)
    const pageNumbers = []
    for (let i=1; i <= Math.ceil(totalCountriesToShow / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    const pages = () => {
        return (
            <div>
            <ul className="pagination">
                {
                    pageNumbers.map(num => (
                        <li key={num} className="page-item">
                            <a  href="!#" 
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

  return pages()
}
