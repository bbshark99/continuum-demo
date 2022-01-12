import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useFavorite } from "../context/favorite";

function Tokens() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const { account } = useWeb3React();
  const { tokenContract, loading: loadingNfts, nfts } = useFavorite();

  const handleMint = async () => {
    if (category === "") return;

    setLoading(true);

    try {
      const tx = await tokenContract.mint(category);
      await tx.wait();
    } catch (error) {
      console.error("Mint error: ", error.message);
    }

    setLoading(false);
  };

  const handleUpgrade = async (id) => {
    setLoading(true);

    try {
      const tx = await tokenContract.upgrade(id, { value: '10000000000000000'});
      await tx.wait();
    } catch (error) {
      console.error("Upgrade error: ", error.message);
    }

    setLoading(false);
  };

  return (
    <div className="tokens">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        <option value="0">Crown</option>
        <option value="1">Shield</option>
      </select>
      &nbsp;&nbsp;&nbsp;
      <button disabled={loading} onClick={handleMint}>
        Mint
      </button>
      <div className="container">
        {loadingNfts ? (
          <h5>Loading NFTS....</h5>
        ) : (
          <ul>
            {nfts &&
              nfts.length &&
              nfts.map((nft) => (
                <li key={nft.tokenId}>
                  <img src={nft.tokenUri} alt={nft.tokenId} />
                  &nbsp;&nbsp;&nbsp;
                  <div>
                    <p>Id: {nft.tokenId}</p>
                    <p>Owner: {nft.tokenOwner}</p>
                    <p>Level: {nft.tokenLevel}</p>
                    {nft.tokenLevel === 0 && account === nft.tokenOwner && (
                      <button
                        disabled={loading}
                        onClick={() => handleUpgrade(nft.tokenId)}
                      >
                        Upgrade
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tokens;
