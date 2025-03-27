import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../assets/utils/api";


interface Movie{
    id:number,
    title:string,
    poster_path:string
}
interface MovieState{
    popularMovies:Movie [],
    trendingMovies:Movie [],
    loading:boolean,
    error:string|null
}



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


const initialState: MovieState = {
    popularMovies: [],
    trendingMovies: [],
    loading: false,
    error: null,
};

const MovieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
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
            });
    },
});


export default MovieSlice.reducer
