import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { useFavorite } from './context/favorite'
import { injected } from './utils/connector'

import './App.css'

function App() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const { contract, images, loading: loadingImages } = useFavorite()
  const { activate, deactivate, account, active } = useWeb3React()

  const handleConnect = () => {
    if (active) {
      deactivate()
    } else {
      activate(injected)
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleUpload = async () => {
    if (!value) return

    setLoading(true)
    try {
      const tx = await contract.mint(value)
      await tx.wait()

      setValue('')
    } catch (error) {
      console.error('TX error: ', error.message)
    }

    setLoading(false)
  }

  const handleLike = async (id) => {
    setLoading(true)
    try {
      const tx = await contract.like(id)
      await tx.wait()
    } catch (error) {
      console.error('LIKE ERROR: ', error.message)
    }
    setLoading(false)
  }

  const handleUnLike = async (id) => {
    setLoading(true)
    try {
      const tx = await contract.unlike(id)
      await tx.wait()
    } catch (error) {
      console.error('UNLIKE ERROR: ', error.message)
    }
    setLoading(false)
  }

  return (
    <div className="App">
      <div className="header">
        <button onClick={handleConnect}>
          {active ? 'Disconnect' : 'Connect Wallet'}
        </button>
      </div>
      {active && (
        <div className="body">
          <h5>{account}</h5>

          <div className="">
            <span>Paste the image URL:</span>
            &nbsp;&nbsp;&nbsp;
            <input type="text" value={value} onChange={handleChange} />
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleUpload} disabled={loading}>
              Upload
            </button>
          </div>

          <div className="container">
            {loadingImages ? <h5>Loading Images....</h5> : (
              <ul>
                {images &&
                  images.length &&
                  images.map((image) => (
                    <li key={image.id}>
                      <img alt={image.id} src={image.url} />
                      {image.liked ? (
                        <button onClick={() => handleUnLike(image.id)}>
                          UnLike
                        </button>
                      ) : (
                        <button onClick={() => handleLike(image.id)}>Like</button>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
