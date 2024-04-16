import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import { Container, Row, Col, Card } from 'react-bootstrap';

function ArtistAlbums() {
  const [albums, setAlbums] = useState([]);
  const { artistId } = useParams(); // Use the useParams hook to get the artistId from the URL parameter

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });
        const data = await response.json();
        setAlbums(data.items); // Set the albums state to the array of albums returned by the Spotify API
      } catch (error) {
        console.error('Error fetching artist albums:', error);
      }
    };

    fetchAlbums();
  }, [artistId]);

  return (
    <div className="App">
      <Container>
        <Row className="mx-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {albums.map((album) => (
            <Col key={album.id}>
              <div className="d-flex h-100">
                <Card className="w-100">
                  <Card.Img src={album.images[0]?.url || ''} className="card-img-top h-70" alt="Album" />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                    <p>Release Date: {album.release_date}</p>
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

export default ArtistAlbums;
