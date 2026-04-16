import { useState, useRef } from 'react'
import './App.css'

const PASSWORD = 'Environ@123'
const VIDEO_ID = '1D3wU99nIvicT0oX1qaOk93k1L9cV8JBO'

function EyeIcon({ open }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )
}

function FullscreenIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const videoWrapperRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (input === PASSWORD) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setInput('')
    }
  }

  function handleFullscreen() {
    const el = videoWrapperRef.current
    if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen()
  }

  if (unlocked) {
    return (
      <div className="player-container">
        <h1 className="title">EnvironSteel</h1>
        <div className="video-wrapper" ref={videoWrapperRef}>
          <iframe
            src={`https://drive.google.com/file/d/${VIDEO_ID}/preview`}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="EnvironSteel Video"
          />
          <button className="fullscreen-btn" onClick={handleFullscreen} aria-label="Fullscreen">
            <FullscreenIcon />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="gate-container">
      <div className="gate-card">
        <h1 className="title">EnvironSteel</h1>
        <p className="subtitle">Enter the password to watch the video</p>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              placeholder="Password"
              autoFocus
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
          {error && <p className="error">Incorrect password. Please try again.</p>}
          <button type="submit" className="unlock-btn">Unlock</button>
        </form>
      </div>
    </div>
  )
}
