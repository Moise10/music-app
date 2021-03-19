import React from 'react';


const LibrarySong = ({ currentSong, audioRef, isPlaying,
  song, songs, setCurrentSong, id, setSongs }) => {
  const seletedSongHandler = async  () => {
    const selectedSong = songs.filter(t => t.id === song.id);
    const newSong = songs.map(song => {
      if (song.id === id) {
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    })
    await setSongs(newSong);
    await setCurrentSong(selectedSong[0]);
    // play song
    if (isPlaying) audioRef.current.play();
  }
  return (
    <div onClick={seletedSongHandler}
      className={`library-song ${song.active ? 'selected' : ""}`}>
      <img src={song.cover} alt={song.cover} />
      <div className="song-description">
        <h2>{song.name}</h2>
        <h3>{ song.artist}</h3>
      </div>
      
    </div>
  );
}

export default LibrarySong;