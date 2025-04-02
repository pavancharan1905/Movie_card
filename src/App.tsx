import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './component/NavBar';
import { store } from './redux/store';
import Home from './pages/Home';
import Search from './pages/Search';
import { Box } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
     
      
        <Router>
          <Navbar />
          <Box sx={{ mt: 8 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Box>
        </Router>
     
    </Provider>
  );
}

export default App;