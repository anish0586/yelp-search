import React from 'react'

const SearchResult = ({
    results
}) =>
<div className='yelp-result'>
<h3 id='search-result' className='title'>Search Results</h3>
{
    results === null ? <div /> : (
        results.map(result => (
            <div key={result.id} className='result bg-white p-1 my-1'>
                <div>
                    <h2>{result.name}</h2>                    
                    {result.location && (<h4>{result.location.address1}, {result.location.city}</h4>)}
                    {result.categories && (<p><b>Categories: </b>{result.categories.map(e => e.title).join(', ')}</p>)}
                    {result.reviews && result.reviews.length > 0 && (<p><b>Review: </b>{result.reviews[0].text} - <i>{result.reviews[0].user.name}</i></p>)}
                    <ul>
                        {result.phone && (<li className='p-2'>
                            <b>Phone</b>: {result.phone}
                        </li>)}
                        {result.rating && (<li className='p-2'>
                            <b>Rating</b>: {result.rating}
                        </li>)}
                        {result.price && (<li className='p-2'>
                            <b>Price</b>: {result.price}
                        </li>)}
                    </ul>                    
                </div>

            </div> 
        ))
    )
}
</div>;

export default SearchResult
