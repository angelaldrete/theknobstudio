import { faPause, faPlay, faStop, faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react"
import '@styles/mediacontrols.css'

interface MediaControlsProps {
  audioSrc: string;
}

const MediaControls: React.FC<MediaControlsProps> = ({
  audioSrc
}) => {
  const audioRef = React.useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = React.useState<boolean>(false)
  const [currentTime, setCurrentTime] = React.useState<string>('00:00')
  const [duration, setDuration] = React.useState<string>('00:00')

  /**
   *
   * @param {React.SyntheticEvent<HTMLAudioElement, Event>} e - the event object from the audio element onTimeUpdate event listener
   * @description Handles the time update of the audio element
   * @returns void
   */
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    // Retrieve the audio element and format the current time
    const audio = e.currentTarget
    const currentTime = audio.currentTime
    const formattedCurrentTime = formatTime(currentTime)

    // set the current time state
    setCurrentTime(formattedCurrentTime)

    // set the value of the seek input to the current time of the audio
    const seekInput: HTMLInputElement = document.querySelector('.media-controls__seek') as HTMLInputElement
    seekInput.value = currentTime.toString()

  }

  /**
   * 
   * @param {React.SyntheticEvent<HTMLAudioElement, Event>} e - the event object from the audio element onLoadedMetadata event listener
   * @description Handles the metadata load of the audio element
   * @returns void
   */
  const handleMetadataLoad = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    // Retrieve the audio element and format the duration
    const audio = e.currentTarget
    const duration = audio.duration
    const formattedDuration = formatTime(duration)

    // set the duration state
    setDuration(formattedDuration)

    // set the volume to 0.5
    audioRef.current!.volume = 0.5

    // set the max value of the seek input to the duration of the audio
    const seekInput: HTMLInputElement = document.querySelector('.media-controls__seek') as HTMLInputElement
    seekInput.max = duration.toString()
  }

  /**
   * 
   * @param {React.SyntheticEvent<HTMLInputElement>} e - the event object from the seek input onChange event listener
   * @description Handles the seek bar change
   * @returns void
   * 
   */
  const handleSeekBarChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // seek to the time of the seek input
    audioRef.current!.currentTime = parseFloat(e.currentTarget.value)
  }

  /**
   * 
   * @param {number} time - the time in seconds
   * @description Formats the time to 00:00
   * @returns string
   *
   */
  const formatTime = (time: number) => {
    // format it 00:00
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div className="media-controls">
      <div className="wrapper seek">
        <input
          className="media-controls__seek"
          type="range"
          min="0"
          max="0"
          step="any"
          defaultValue="0"
          onChange={(e) => {
            handleSeekBarChange(e)
          }}
        />
        <div className="media-controls__duration">
          <span className="media-controls__current-time">
            {currentTime}
          </span>
          <span className="media-controls__duration-separator">/</span>
          <span className="media-controls__total-time">
            {duration}
          </span>
        </div>
      </div>
      <div className="wrapper controls">
        <audio 
          ref={audioRef} 
          src={audioSrc}
          // wait for the audio to load before setting the max value of the seek input
          onLoadedMetadata={(e) => {
            handleMetadataLoad(e)
          }}
          onTimeUpdate={(e) => {
            handleTimeUpdate(e)
          }}
        />
        <button 
          className="mcBtn media-controls__play"
          onClick={() => audioRef.current?.play()}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button 
          className="mcBtn media-controls__pause" 
          onClick={() => audioRef.current?.pause()}
        >
          <FontAwesomeIcon icon={faPause} />
        </button>
        <button
          className="mcBtn media-controls__stop"
          onClick={() => {
            audioRef.current?.pause()
            audioRef.current?.load()
          }}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
      <div className="wrapper volume">
        <button 
          className="mcBtn media-controls__mute"
          onClick={() => {
            audioRef.current!.muted = !audioRef.current!.muted
            setIsMuted(!isMuted)
          }}
        >
          <FontAwesomeIcon icon={
            isMuted ? faVolumeMute : faVolumeUp
          } />
        </button>
        <input 
          type="range"
          min="0"
          max="1"
          step="any"
          defaultValue="0.5"
          onChange={(e) => {
            audioRef.current!.volume = parseFloat(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default MediaControls
