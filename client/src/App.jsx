import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('Connecting to backend...')

  useEffect(() => {
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Backend connection failed!'))
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold text-blue-500">
        HamzaPats this side!
      </h1>

      <p className="text-white text-xl">
        Backend Response: {message}
      </p>
    </div>
  )
}

export default App