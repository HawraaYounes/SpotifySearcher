// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ArtistSearch from './components/ArtistSearch';
import ArtistAlbums from './components/ArtistAlbums';
import CallbackPage from './components/CallbackPage';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<ArtistSearch />} />
          <Route path="/callback" element={<CallbackPage/>} />
          <Route path="/albums/:artistId" element={<ArtistAlbums/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
