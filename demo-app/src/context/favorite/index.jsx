import { createContext, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { getFavoriteContract, getTokenContract } from "./contract";

const FavoriteState = {};

const FavoriteContext = createContext(FavoriteState);

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [nfts, setNfts] = useState([]);
  const { active, library, chainId, account } = useWeb3React();

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      const con = getFavoriteContract(chainId, library);
      const token = getTokenContract(chainId, library);
      setContract(con);
      setTokenContract(token);

      const len = await con.imagesLength();
      const length = parseInt(len.toString(), 10);

      const nftCount = await token.nftCount();
      const nftsCount = parseInt(nftCount.toString(), 10);

      let data = [];
      // fetch images from contract
      for (let i = 0; i < length; i++) {
        const image = await con.images(i);
        const liked = await con.favorites(account, image.imageId);

        data.push({
          id: image.imageId.toString(),
          url: image.imageUri,
          liked,
        });
      }

      setImages(data);

      let nftData = [];
      for (let i = 0; i < nftsCount; i++) {
        const nft = await token.nfts(i);
        const owner = await token.ownerOf(nft.tokenId);

        nftData.push({
          tokenId: nft.tokenId.toString(),
          tokenUri: nft.tokenURI,
          tokenOwner: owner,
          tokenLevel: parseInt(nft.tokenLevel.toString(), 10),
        });
      }

      setNfts(nftData);

      setLoading(false);
    };

    active && library && account && initialize();
  }, [active, library, chainId, account]);

  return (
    <FavoriteContext.Provider
      value={{
        loading,
        contract,
        tokenContract,
        images,
        nfts,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
