import React, { useState } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

function ArtistSearch() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for artist:', searchInput);
  };

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for an artist.."
            type="input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row className="mx-2 row row-cols-4">
          {/* Example card */}
          <Card>
            <Card.Img src="#" />
            <Card.Body>
              <Card.Title>Artist Name</Card.Title>
            </Card.Body>
          </Card>
          {/* Add more cards dynamically based on search results */}
        </Row>
      </Container>
    </div>
  );
}

export default ArtistSearch;
