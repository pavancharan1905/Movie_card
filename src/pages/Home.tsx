import { fetchPopularMovies, fetchTrendingMovies } from "../redux/MovieSlice";
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState, AppDispatch } from '../redux/store' 
import { useEffect } from 'react';
import MovieCard from "../component/Moviecard" ;



function Home(){
  const Dispatch = useDispatch<AppDispatch>();
  const { popularMovies, trendingMovies, loading, error } = useSelector( 
    (state: RootState) => state.movie);
  
  useEffect(() => {
    Dispatch(fetchPopularMovies()); 
    Dispatch(fetchTrendingMovies());
  }, [Dispatch]); 

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>{error}</p>;

  return ( 
    <div> 
      <h2>Popular Movies</h2> 
      <div style={gridStyle}> 
        {popularMovies.map((movie: any) => ( 
          <div key={movie.id}>
          <MovieCard key={movie.id} movie={movie} /> 
          </div>
        ))} 
      </div> 

      <h2>Trending Movies</h2> 
      <div style={gridStyle}> 
        {trendingMovies.map((movie: any) => ( 
          <MovieCard key={movie.id} movie={movie} /> 
        ))} 
      </div> 
    </div> 
  )
}; 

const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(4, 1fr)', 
  gap: '16px',
  padding: '0 16px', 
}; 

export default Home; 

