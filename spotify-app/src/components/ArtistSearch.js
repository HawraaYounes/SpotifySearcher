import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons/fa

function ArtistSearch() {
  const [searchInput, setSearchInput] = useState(''); // State to hold the search input value
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(''); // State to hold the debounced search input value
  const accessToken = localStorage.getItem('spotify_access_token'); // Get the access token from local storage
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Debounce the search input to reduce API requests
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  // Restore previous search input from local storage when component mounts
  useEffect(() => {
    const previousSearchInput = localStorage.getItem('previousSearchInput');
    if (previousSearchInput) {
      setSearchInput(previousSearchInput);
      setDebouncedSearchInput(previousSearchInput);
    }
  }, []);

  // Fetch artist data from Spotify API based on the search input
  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${debouncedSearchInput}&type=artist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        const filteredResults = data.artists.items.filter((artist) =>
          artist.name.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        );
        setSearchResults(filteredResults);

        // Save search input to local storage
        localStorage.setItem('previousSearchInput', debouncedSearchInput);
      } catch (error) {
        console.error('Error searching for artists:', error);
      }
    };

    if (debouncedSearchInput) {
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchInput, accessToken]);

  // Function to render star rating
  const renderStarRating = (popularity) => {
    const rating = Math.round(popularity / 20); // Convert popularity (0-100) to a 1-5 rating
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star filled">&#9733;</span>); // Render a filled star with class "filled"
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>); // Render an empty star
      }
    }

    return stars;
  };

  // Function to handle click on artist card and navigate to artist albums
  const handleCardClick = (artistId) => {
    navigate(`/albums/${artistId}`);
  };

  return (
    <div className="App">
      {/* Search input field */}
      <Container className="search-container cc">
        <InputGroup className="mb-5" size="lg">
          <FormControl
            aria-label="Large"
            className="rounded-start h-auto"
            placeholder="Search for an artist..."
            type="input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          {/* Search button */}
          <Button variant="success" onClick={() => setDebouncedSearchInput(searchInput)} className='search-btn'>
            <FaSearch className='search-icon' /> 
          </Button>
        </InputGroup>
      </Container>

      {/* Display search results */}
      <Container fluid>
        <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {searchResults.map((artist) => (
            <Col key={artist.id}>
              <div className="h-75">
                {/* Artist card */}
                <Card className="w-100" onClick={() => handleCardClick(artist.id)}>
                  {/* Artist image */}
                  <div className="card-img-container ">
                    <Card.Img src={artist.images[0]?.url || ''} className="card-img " alt="Artist" />
                  </div>
                  <Card.Body>
                    <div className="artist-info">
                    {/* Artist name */}
                    <Card.Title>{artist.name}</Card.Title>
                    {/* Follower count */}
                    <div className="follower-count">{artist.followers.total} followers</div>
                    </div>
                  </Card.Body>
                  {/* Star rating */}
                  <Card.Footer className="border-0 text-muted mb-1">
                    <div className="star-rating">{renderStarRating(artist.popularity)}</div>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ArtistSearch;
