// ArtistAlbums.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ArtistAlbums() {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums data from Spotify API based on artistId
    // Update albums state
  }, [artistId]);

  return (
    <div className="artist-albums">
      <h2>Albums by {artistId}</h2>
      {albums.map((album) => (
        <div key={album.id} className="album">
          <img src={album.image} alt={album.name} />
          <h3>{album.name}</h3>
          <p>Artists: {album.artists.join(', ')}</p>
          <p>Release Year: {album.releaseYear}</p>
          <p>Total Tracks: {album.totalTracks}</p>
          <a href={album.spotifyUrl} target="_blank" rel="noopener noreferrer">
            Preview on Spotify
          </a>
        </div>
      ))}
    </div>
  );
}

export default ArtistAlbums;
