import React, { useEffect } from "react"
import SongItem from '@components/SongItem'
import MediaControls from '@components/MediaControls'
import Background from '@components/Background'
import Title from '@components/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'
import songList from "../data/songs"
import '@styles/home.css'

interface Song {
  title: string,
  description: string,
  imgSrc: string,
  imgDescription: string,
  audioSrc: string,
}

enum Direction {
  next = 'next',
  previous = 'previous'
}

const Home = () => {
  const [song, setSong] = React.useState<Song>({title: '', description: '', imgSrc: '', imgDescription: '', audioSrc: '' })
  const [songs, setSongs] = React.useState<Song[]>([])

  useEffect(() => {
    songList.sort(() => Math.random() - 0.5)
  
    if (songs.length > 0) {
      setRandomSong()
    }
    else {
      retrieveFromLocalData()
    }
  }, [songs])
  /**
   * 
   * @returns void
   * @description sets a random song from the songs array
   * 
   */
  const setRandomSong = () => {
    const randomSong = songs[Math.floor(Math.random() * songs.length)]
    setSong(randomSong)
  }

  /**
   * 
   * @returns void
   * @description retrieves the songs from the data folder
   *  
   */
  const retrieveFromLocalData = () => {
    setSongs(songList)
  }

  /**
   * 
   * @returns void
   * @description handles the next or previous song
   * 
   * @param {Direction} direction - the direction of the song change {next, previous
   * 
   */
  const handleSongChange = (direction: Direction) => {
    // Get the index of the current song
    const currentSongIndex = songs.indexOf(song)
    // Check if the direction is next and get the next song
    if (direction === Direction.next) {
      // If the current song is the last song in the array, get the first song
      if (currentSongIndex === songs.length - 1) {
        const firstSong = songs[0]
        setSong(firstSong)
        return
      } else {
        const nextSong = songs[currentSongIndex + 1]
        setSong(nextSong)
        return
      }
    }

    // Check if the direction is previous and get the previous song
    if (direction === Direction.previous) {
      // If the current song is the first song in the array, get the last song
      if (currentSongIndex === 0) {
        const lastSong = songs[songs.length - 1]
        setSong(lastSong)
        return
      } else {
        const previousSong = songs[currentSongIndex - 1]
        setSong(previousSong)
        return
      }
    }
  } 

  return (
    <div className="home">
      <Background imgSrc={song.imgSrc} />
      <div className="song">
        <div className="song__wrapper show">
          <button 
            className="mcBtn media-controls__prev"
            onClick={() => handleSongChange(Direction.previous)}
          >
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <SongItem
            songTitle={song.title}
            songDescription={song.description}
            imgSrc={song.imgSrc}
            imgDescription={song.imgDescription}
          />
          <button 
            className="mcBtn media-controls__next"
            onClick={() => handleSongChange(Direction.next)}
          >
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
        <MediaControls audioSrc={song.audioSrc} />
      </div>
    </div>
  )
}

export default Home
