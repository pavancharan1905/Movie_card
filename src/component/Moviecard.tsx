import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { addToWatchlist, removeFromWatchlist } from "../redux/MovieSlice";
import { RootState } from "../redux/store";

// Define Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// Define Props
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.movie.watchlist);

  // Check if the movie is in the watchlist
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  // Handle watchlist button click
  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering parent click events
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(227, 233, 235, 0.8)",
        cursor: "pointer",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Movie Poster */}
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        sx={{
          height: 500,
          objectFit: "cover",
          width: "100%",
        }}
      />

      {/* Movie Details */}
      <CardContent sx={{ flexGrow: 1, padding: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          color={"black"}
          sx={{ fontWeight: "bold"}}
        >
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}{" "}
          / 10
        </Typography>
      </CardContent>

      {/* Watchlist Toggle Button */}
      <IconButton
        onClick={handleWatchlistClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "white",
        }}
      >
        {isInWatchlist ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;



      






    
