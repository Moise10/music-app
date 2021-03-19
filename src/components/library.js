import React from 'react';
import LibrarySong from './librarySong'


const Library = ({
  currentSong, songs, isPlaying, libraryStatus,
  setCurrentSong, audioRef , setSongs }) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              isPlaying={isPlaying}
              audioRef={audioRef}
              setSongs={setSongs}
              setCurrentSong={setCurrentSong}
              songs={songs}
              song={song}
              id={song.id}
              currentSong={currentSong} key={song.id} />
          )
        })}
      </div>
    </div>
   );
}
 
export default Library;