import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../assets/utils/api";


interface Movie{
    id:number,
    title:string,
    poster_path:string
}
interface MovieState{
    popularMovies:Movie [],
    trendingMovies:Movie [],
    searchResults:Movie[];
    loading:boolean,
    error:string|null
}

const initialState: MovieState={
    popularMovies:[],
    trendingMovies:[],
    searchResults:[],
    loading:false,
    error:null,
};


export const fetchPopularMovies = createAsyncThunk(
    'movie/fetchPopularMovies',
    async () => {
        const response = await api.get('/movie/popular');
        return response.data;
    }
);

export const fetchTrendingMovies = createAsyncThunk(
    'movie/fetchTrendingMovies',
    async () => {
        const res = await api.get('/trending/movie/day');
        return res.data;
    }
);

export const searchMoviesAsync=createAsyncThunk(
    'movies/searchMovies',
    async (query:string) => {
        const response = await api.get(`/search/movie?query=${query}`);
        return response.data.results;
    }
);




const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.popularMovies = action.payload.results;
                state.error = null;
            })
            .addCase(fetchPopularMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching popular movies";
            })
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingMovies = action.payload.results;
                state.error = null;
            })
            .addCase(fetchTrendingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching trending movies";
            })
            .addCase(searchMoviesAsync.fulfilled,(state, action: PayloadAction<Movie[]>) => {
              state.searchResults=action.payload  
            })
            .addCase(searchMoviesAsync.rejected, (state, action) =>{
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch search results';
            })
            .addCase(searchMoviesAsync.pending, (state) => {
                state.loading=true;
            })
    },
            
});


export default MovieSlice.reducer
