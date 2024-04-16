import React, { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Col, Card } from 'react-bootstrap';

function ArtistSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('');
  const accessToken = localStorage.getItem('spotify_access_token'); // Retrieve access token from localStorage

  // Debounce function to delay search execution
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    // Cleanup function to clear timer
    return () => {
      clearTimeout(timerId);
    };
  }, [searchInput]);

  // Perform search when debounced search input changes
  useEffect(() => {
    const search = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${debouncedSearchInput}&type=artist`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use access token in API request
          },
        });
        const data = await response.json();

        // Filter the search results based on the artist's name
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
      setSearchResults([]); // Clear search results if input is empty
    }
  }, [debouncedSearchInput, accessToken]);

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for an artist..."
            type="input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={() => setDebouncedSearchInput(searchInput)}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {searchResults.map((artist) => (
            <Col key={artist.id}>
              <div className="d-flex h-100">
                <Card className="w-100">
                  <Card.Img src={artist.images[0]?.url || ''} className="card-img-top h-100" alt="Artist" />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                  </Card.Body>
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