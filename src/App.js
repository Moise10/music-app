import React, {useState, useRef} from 'react';
import Player from './components/player'
import Song from './components/song';
import "./styles/app.scss";
import data from "./data"
import Library from './components/library'
import Nav from "./components/nav"

const App = () => {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false);

  // console.log(currentSong)
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,  currentTime: current, duration: duration
    })
  }
  const autoPlayHandler = async () => {
let currentIndex = songs.findIndex(index => index.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}  />
      <Player 
        isPlaying={isPlaying} setSongs={setSongs}
        setIsPlaying={setIsPlaying} songs={songs}
        audioRef={audioRef} currentSong={currentSong}
        songInfo={songInfo} setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong} />
      <Library
        libraryStatus={libraryStatus}
        currentSong={currentSong} isPlaying={isPlaying}
        audioRef={audioRef} setSongs={setSongs}
        songs={songs} setCurrentSong={setCurrentSong} />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef} src={currentSong.audio}
        onEnded={autoPlayHandler}
      >
      </audio>
    </div>
  );
}

export default App;