import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from './utils/connector';
import Tokens from './views/Tokens';
import Images from './views/Images';

import './App.css'

function App() {
  const [page, setPage] = useState(0);
  const { activate, deactivate, account, active } = useWeb3React()

  const handleConnect = () => {
    if (active) {
      deactivate()
    } else {
      activate(injected)
    }
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

          <div className="nav">
            <span onClick={() => setPage(0)}>Images</span>
            <span onClick={() => setPage(1)}>Tokens</span>
          </div>

          <hr />

          {page === 0 ? <Images /> : <Tokens />}
        </div>
      )}
    </div>
  );
}

export default App;
