import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { removeFromWatchlist } from "../redux/MovieSlice";
import { Container, Typography, Grid, Button, GridLegacy } from "@mui/material";
import MovieCard from "../component/Moviecard";

const WatchList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Watchlist
      </Typography>
      {watchlist.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your watchlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <GridLegacy key={movie.id} item xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(removeFromWatchlist(movie.id))}
                sx={{ mt: 2 }}
              >
                Remove from Watchlist
              </Button>
            </GridLegacy>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchList;