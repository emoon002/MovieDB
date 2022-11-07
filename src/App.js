import {useEffect, useState} from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com/?apikey=63dfdd35'

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    return (
        <div className='app'>
            <h1>MovieDB</h1>
            <div className="search">
                <input onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} type="text" placeholder='Search for movies...' value={searchTerm} />
                <img onClick={() => searchMovies(searchTerm)} src={SearchIcon} alt='search' />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2 id="message">No movies found!</h2>
                    </div>
                )}
        </div>
    )
}

export default App