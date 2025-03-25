import { useDispatch, useSelector } from 'react-redux'; 
import { fetchPopularMovies, fetchTrendingMovies } from "../redux/MovieSlice";
import { RootState, AppDispatch } from "../redux/store"; 
import MovieCard from '../component/Moviecard';
import { useEffect } from 'react';
import { getAccordionDetailsUtilityClass } from '@mui/material';

function Home() { 
  const Dispatch = useDispatch<AppDispatch>(); 
  const { popularMovis, trendingMovies,error,loading } = useSelector(
    (state: RootState) => state.movie); 
  useEffect(() => { 
    Dispatch(fetchPopularMovies()); 
    Dispatch(fetchTrendingMovies()); 
  }, [Dispatch]); 

  if (loading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>{error}</p>
}

  return ( 
    <div> 
      <h2>Popular Movies</h2> 
      <div style={gridStyle}> 
        {popularMovis.map((movie: any) => ( 
          <div key={movie.id}>
                <MovieCard movie={movie}/>
            </div> 
        ))} 
     </div>
     <h1> Trending Movies</h1>
     <div style={gridStyle}>
     {trendingMovies.map((movie: any)=> (
            <MovieCard key={movie.id} movie={movie}/>
   
        ))}

        </div>
</div>  
);  
};

const gridStyle={
  display:'grid',
  gridTemplateColumn:'repeat(4, 1fr)',
  gap:'16px',
  padding:'0 16px',
};

export default Home; 
