import React, {useState} from 'react' 


const SearchMovies = () => {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()

        const url =`https://api.themoviedb.org/3/search/movie?api_key=5f82493c0fb2ca039ee28a028a37b01b&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const res = await fetch(url);
            const data =  await res.json();
            console.log(data.results);
            setMovies(data.results);
        } catch(err){
            console.error(err);
        } 
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
            <label htmlFor="query" className="label">Movie Search</label>
                <input type="text" className="input" name="query" placeholder="search for your favorite movie !"
                value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button type="submit" className="button">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="card" key={movie.id}>
                        <img className="card--image" 
                        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                        alt={movie.title + ' poster'}/>
                        <div className="card--content">
                            <h3 className="card--title">{movie.title}</h3>
                            <p><small>REALEASE DATE: {movie.release_date}</small></p>
                            <p><small>RATING: {movie.vote_average}</small></p>
                            <p className="card--desc">{movie.overview}</p>

                        </div>
                    </div>
                ))}
            </div>
            
        </>
    )
}

export default SearchMovies