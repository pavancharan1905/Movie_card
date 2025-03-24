import { useDispatch, useSelector } from 'react-redux'; 
import { fetchPopularMovies, fetchTrendingMovies } from "../redux/MovieSlice";
import { RootState, AppDispatch } from "../redux/store"; 

interface Movie{
    id:number;
    title:string;
    poster_path:string,
}

function Home() { 
  const Dispatch = useDispatch<AppDispatch>(); 
  const { popularMovis, trendingMovies,error,loading } = useSelector(
    (state: RootState) => state.movies); 
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
      <div> 
        {popularMovis.map((movie: Movie) => ( 
          <div key={movie.id}>
                <h2> {movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt={movie.title}/>

            </div> 
        ))} 
     </div>
     <h1> Trending Movies</h1>
     <div>
     {trendingMovies.map((movie: Movie)=> (
            <div key={movie.id}>
                <h2>{movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt={movie.title}/>
                </div>
   
        ))}

        </div>
</div>  
)   

}

export default Home; 
