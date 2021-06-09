import React, {useState} from 'react' 
import MovieCard from './MovieCard'


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
                <MovieCard movie={movie} key={movie.id}/> 
                ))}
            </div>
            
        </>
    )
}

export default SearchMovies