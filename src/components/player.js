import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({
  currentSong,setCurrentSong, songs, setSongs,
  audioRef, songInfo, setSongInfo,
  isPlaying, setIsPlaying }) => {
    
  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }
  
  const dragHandler = async  (e) => {
    audioRef.current.currentTime = e.target.value;
    await setSongInfo({...songInfo, currentTime: e.target.value})
  }
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }
  const activeLibraryHandler = (nextPrev) => {
    const newSong = songs.map(song => {
      if (song.id === nextPrev.id) {
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
    setSongs(newSong);
  }
  
  const handleSkipForward = async () => {
    let currentIndex = songs.findIndex(index => index.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
  }
  const handleSkipBack = async () => {
    let currentIndex = songs.findIndex(index => index.id === currentSong.id);
    if ((currentIndex -1) % songs.length < 0) {
      await setCurrentSong(songs[songs.length - 1]);
      if (isPlaying) audioRef.current.play();
      activeLibraryHandler(songs[songs.length - 1])
      return;
    }
    await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
    activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input type="range" min="0" onChange={dragHandler}
          max={songInfo.duration || 0} value={songInfo.currentTime} />
        <p>
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon icon={faAngleLeft} size="2x" onClick={handleSkipBack} className="skip-back" />
        <FontAwesomeIcon onClick={handlePlay}
          icon={ !isPlaying ? faPlay : faPause} size="2x" className="play" />
        <FontAwesomeIcon icon={faAngleRight} size="2x" onClick={handleSkipForward }className="skip-forward"/>
      </div>
    </div>
  );
}

export default Player;