import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../assets/utils/api";

// Define Movie Interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// Define State Interface
interface MovieState {
  trendingMovies: Movie[];
  popularMovies: Movie[];
  watchlist: Movie[];
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: MovieState = {
  trendingMovies: [],
  popularMovies: [],
  searchResults: [],
  watchlist: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTrendingMovies = createAsyncThunk(
  "movie/fetchTrendingMovies",
  async () => {
    const res = await api.get("/trending/movie/day");
    return res.data.results;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async () => {
    const res = await api.get("/movie/popular");
    return res.data.results;
  }
);

export const searchMoviesAsync = createAsyncThunk(
  "movies/searchMovies",
  async (query: string) => {
    const res = await api.get(`/search/movie?query=${query}`);
    return res.data.results;
  }
);

// Movie Slice
const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      if (!state.watchlist.some((movie) => movie.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter((movie) => movie.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching trending movies";
      })
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching popular movies";
      })
      .addCase(searchMoviesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMoviesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMoviesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching search results";
      });
  },
});

export const { addToWatchlist, removeFromWatchlist } = MovieSlice.actions;
export default MovieSlice.reducer;
