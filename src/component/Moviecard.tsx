import React from 'react'; 
import { Card, CardContent, Typography, CardMedia } from '@mui/material'; 

interface Movie { 
  title: string; 
  poster_path: string; 
  vote_average: number | null; 
} 

interface MovieCardProps { 
  movie: Movie; 
} 

const Moviecard: React.FC<MovieCardProps> = ({ movie }) => { 
  return ( 
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        cursor: 'pointer', 
        boxShadow: 3, 
        borderRadius: 2, 
        overflow: 'hidden', 
      }} 
    > 
      <CardMedia 
        component="img" 
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
        sx={{ 
          height: 350, 
          objectFit: 'cover', 
          width: '100%', 
        }} 
      /> 
      <CardContent sx={{ flexGrow: 1, padding: 1 }}> 
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}> 
          {movie.title} 
        </Typography> 
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} 
        </Typography> 
      </CardContent> 
    </Card> 
  ); 
} 

export default Moviecard;