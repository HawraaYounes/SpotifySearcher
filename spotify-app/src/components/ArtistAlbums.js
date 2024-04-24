import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function ArtistAlbums() {
  // State to hold the artist name
  const [artistName, setArtistName] = useState('');
  // State to hold the albums
  const [albums, setAlbums] = useState([]);
  // Get the artistId from URL params
  const { artistId } = useParams();

  useEffect(() => {
    // Fetch artist information when component mounts
    const fetchArtistInfo = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });
        const data = await response.json();
        setArtistName(data.name);
      } catch (error) {
        console.error('Error fetching artist info:', error);
      }
    };

    // Fetch artist albums when component mounts
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

    // Call fetch functions
    fetchArtistInfo();
    fetchAlbums();
  }, [artistId]); // Dependency array ensures these effects only run when artistId changes

  return (
    <div className="App">
      <Container fluid>
        {/* Header with artist name */}
        <Row className="mx-2 mb-2 align-items-center">
          <Col>
            <h1>{artistName}</h1>
            <h3 className="albums-header">Albums</h3>
          </Col>
        </Row>
        {/* Display albums */}
        <Row className="m-2 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {albums.map((album) => (
            <Col key={album.id}>
              <div className="d-flex h-100">
                <Card className="w-100">
                  {/* Album image */}
                  <Card.Img src={album.images[0]?.url || ''} className="card-img-top h-70" alt="Album" />
                  <Card.Body>
                    {/* Album name */}
                    <Card.Title className="album-name">{album.name}</Card.Title>
                    {/* List of artists */}
                    <ul className="artist-list">
                      {album.artists.map((artist) => (
                        <li key={artist.id}>{artist.name}</li>
                      ))}
                    </ul>
                    {/* Release date and track count */}
                    <p>{album.release_date}</p>
                    <p>{album.total_tracks} tracks</p> 
                  </Card.Body>
                  {/* Footer with preview link */}
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
