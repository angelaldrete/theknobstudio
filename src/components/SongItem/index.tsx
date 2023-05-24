import React from 'react'
import '@styles/song-item.css'

interface SongItemProps {
  songTitle: string,
  songDescription: string,
  imgSrc: string
  imgDescription: string
}

const SongItem: React.FC<SongItemProps> = ({
  songTitle,
  songDescription,
  imgSrc,
  imgDescription
}) => {
  return (
    <div className='song-item'>
      <img src={imgSrc} alt={imgDescription} className="song-item__image" />
      <div className="song-item__meta">
        <h3 className="song-item__title">{songTitle}</h3>
        <p className="song-item__description">{songDescription}</p>
      </div>
    </div>
  )
}

export default SongItem
