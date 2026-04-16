import { useState } from 'react'
import './App.css'

const PASSWORD = 'Environ@123'
const VIDEO_ID = '1D3wU99nIvicT0oX1qaOk93k1L9cV8JBO'

export default function App() {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

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

  if (unlocked) {
    return (
      <div className="player-container">
        <h1 className="title">EnvironSteel</h1>
        <div className="video-wrapper">
          <iframe
            src={`https://drive.google.com/file/d/${VIDEO_ID}/preview`}
            allow="autoplay"
            allowFullScreen
            title="EnvironSteel Video"
          />
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
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
          />
          {error && <p className="error">Incorrect password. Please try again.</p>}
          <button type="submit">Unlock</button>
        </form>
      </div>
    </div>
  )
}
