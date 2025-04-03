import React,{useState} from "react";
import { AppBar,Toolbar,Typography,InputBase, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {styled,alpha} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IconButton from "@mui/material/IconButton";
const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: 'auto',
}));
 
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
 const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '12ch',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar:React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery('');
        }
    };
     return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgb(12, 12, 12)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" padding={3}>
                    Movie App
                </Typography>
                <Box component="form" onSubmit={handleSearch} sx={{ ml: 'auto'}}>
                <Search>
                  <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Search>
                </Box>
                <IconButton
  sx={{
    //bgcolor: "primary.main", 
    color: "white", // White text/icon for contrast
    borderRadius: 1, 
    px: 2, // Add padding for better clickability
    py: 1, 
    //"&:hover": {
      //bgcolor: "primary.dark", // Darker shade on hover
    //},
    boxShadow: 2, // Add slight shadow for depth
    display: "flex",
    alignItems: "center",
    gap: 1, // Space between text and icon
  }}
  onClick={() => navigate("/watchlist")}
>
  Watchlist
  <BookmarkIcon sx={{ fontSize: 20 }} /> {/* Adjust icon size */}
</IconButton>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;