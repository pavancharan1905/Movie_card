import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, GridLegacy } from '@mui/material';
import { searchMoviesAsync } from '../redux/MovieSlice';
import MovieCard from '../component/Moviecard';
import { AppDispatch } from '../redux/store';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number | null;
}


interface RootState {
  movies: {
    searchResults: Movie[];
    loading: boolean;
  };
}


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('q');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading } = useSelector((state: RootState) => state.movies);

  
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMoviesAsync(searchQuery));
    }
  }, [dispatch, searchQuery]);

  
  if (loading) {
    return "Loading...";
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      <Grid container spacing={3}>
        {searchResults.map((movie) => (
          <GridLegacy item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
          </GridLegacy>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;