import { useWeb3React } from "@web3-react/core";
import { injected } from "./utils/connector";

import './App.css';

function App() {
  const { activate, deactivate, account, active } = useWeb3React();

  const handleConnect = () => {
    if (active) {
      deactivate();
    } else {
      activate(injected);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <button onClick={handleConnect}>{
          active ? 'Disconnect' : 'Connect Wallet'
        }</button>
      </div>
      {active && (
        <div className="body">
          <h5>{account}</h5>
        </div>
      )}
    </div>
  );
}

export default App;
