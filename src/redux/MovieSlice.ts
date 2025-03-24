import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'; 
import api from "../assets/utils/api"; 

interface Movie{ 
  id:number,
  title:string
  poster_path:string
} 

interface MovieState { 
  popularMovies: [], 
  trendingMovies: [], 
  loading: false, 
  error: string|null
}


const initialState: MovieState = { 
    popularMovies: [], 
    trendingMovies: [], 
    loading: false, 
    error: null, 
  }

export const fetchPopularMovies = createAsyncThunk( 
  'movies/fetchPopularMovies', 
  async () => { 
    const response = await api.get('/movie/popular'); 
    return response.data
  } 
)

export const fetchTrendingMovies = createAsyncThunk( 
  'movies/fetchTrendingMovies', 
  async () => { 
    const res=await api.get('/movie/trending/day')
    return res.data
  } 
)

const movieSlice = createSlice({ 
    name: 'movies', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => { 
    builder 
      .addCase(fetchPopularMovies.fulfilled,(state,action) => {
        state.popularMovies=action.payload.results
      }) 
      .addCase(fetchPopularMovies.rejected, (state, action) => { 
        state.error=action.error.message || "Error fetching popular movies"
      
      }) 
      .addCase(fetchPopularMovies.pending, (state) => { 
        state.loading=true
      })
    }
});


export default movieSlice.reducer


