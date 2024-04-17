import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ArtistAlbums() {
  const [albums, setAlbums] = useState([]);
  const { artistId } = useParams();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });
        const data = await response.json();
        setAlbums(data.items);
      } catch (error) {
        console.error('Error fetching artist albums:', error);
      }
    };

    fetchAlbums();
  }, [artistId]);

  return (
    <div className="App">
      <Container>
        <Row className="m-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {albums.map((album) => (
            <Col key={album.id}>
              <div className="d-flex h-100">
                <Card className="w-100">
                  <Card.Img src={album.images[0]?.url || ''} className="card-img-top h-70" alt="Album" />
                  <Card.Body>
                    <Card.Title className="album-name">{album.name}</Card.Title>
                    <ul className="artist-list">
                      {album.artists.map((artist) => (
                        <li key={artist.id}>{artist.name}</li>
                      ))}
                    </ul>
                    <p>{album.release_date}</p>
                    <p>{album.total_tracks} tracks</p> 
                  </Card.Body>
                  <Card.Footer className="text-center bg-dark text-white">
                    <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="text-white">
                      Preview on Spotify
                    </a>
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

export default ArtistAlbums;
