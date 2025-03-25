import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'; 
import api from "../assets/utils/api"; 

interface Movie{ 
  id:number,
  title:string
  poster_path:string
} 

interface MovieState { 
  popularMovis: Movie[], 
  trendingMovies: Movie[], 
  loading: boolean, 
  error: string|null
}


const initialState: MovieState = { 
    popularMovis: [], 
    trendingMovies: [], 
    loading: false, 
    error: null, 
  }

export const fetchPopularMovies = createAsyncThunk( 
  'movies/fetchPopularMovies', 
  async () => { 
    const response = await api.get('/movie/popular') 
    return response.data
  } 
)

export const fetchTrendingMovies = createAsyncThunk( 
  'movies/fetchTrendingMovies', 
  async () => { 
    const res=await api.get('/movie/top_rated')
    return res.data
  } 
)

const movieSlice = createSlice({ 
    name: 'movies', 
    initialState:initialState, 
    reducers: {}, 
    extraReducers: (builder) => { 
    builder 
      .addCase(fetchPopularMovies.fulfilled,(state,action) => {
        state.popularMovis=action.payload.results
      }) 
      .addCase(fetchPopularMovies.rejected, (state, action) => { 
        state.error=action.error.message || "Error fetching popular movies"
      }) 
      .addCase(fetchPopularMovies.pending, (state) => { 
        state.loading=true
      })
      .addCase(fetchTrendingMovies.fulfilled,(state,action)=>{
        state.trendingMovies=action.payload.results
      })
      .addCase(fetchTrendingMovies.rejected,(state,action)=>{
        state.error=action.error.message || "Error fetching trending movies"
      })
      .addCase(fetchTrendingMovies.pending,(state)=>{
        state.loading=true
      })

    }
});

export default movieSlice.reducer


