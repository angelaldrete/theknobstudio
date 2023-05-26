import React, { useEffect } from 'react'
import '@styles/background.css'

interface BackgroundProps {
  imgSrc: string;
}

const Background: React.FC<BackgroundProps> = ({
  imgSrc
}) => {

  useEffect(() => {
    const bgImg = document.querySelector('.background img') as HTMLElement
    if (bgImg) {
      bgImg.classList.remove('fade-in')
      void bgImg.offsetWidth
      bgImg.classList.add('fade-in')
    }
  }, [imgSrc])

  return (
    <div className='background'>
      <img src={imgSrc} className='fade-in' />
    </div>
  )
}

export default Background
