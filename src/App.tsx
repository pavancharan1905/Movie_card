import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import { Provider } from 'react-redux';

import Navbar from './component/NavBar'; 
import { store } from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import WatchList from './pages/Watchlist';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline /> {}
        <BrowserRouter>
          <Navbar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<WatchList />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;