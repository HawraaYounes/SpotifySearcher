import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons/fa

function ArtistSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const accessToken = localStorage.getItem('spotify_access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

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

  const handleCardClick = (artistId) => {
    navigate(`/albums/${artistId}`);
  };

  return (
    <div className="App">
      <Container className="search-container">
        <InputGroup className="mb-3" size="lg">
          <FormControl
            aria-label="Large"
            className="rounded-start h-auto"
            placeholder="Search for an artist..."
            type="input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={() => setDebouncedSearchInput(searchInput)} className='search-btn'>
            <FaSearch className='search-icon' /> 
          </Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {searchResults.map((artist) => (
            <Col key={artist.id}>
              <div className="d-flex h-100">
                <Card className="w-100" onClick={() => handleCardClick(artist.id)}>
                  <Card.Img src={artist.images[0]?.url || ''} className="card-img-top h-70" alt="Artist" />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <div className="follower-count">{artist.followers.total} followers</div>
                  </Card.Body>
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
