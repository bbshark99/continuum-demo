import { createContext, useContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { getFavoriteContract } from "./contract";

const FavoriteState = {};

const FavoriteContext = createContext(FavoriteState);

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { active, library, chainId, account } = useWeb3React();

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      const con = getFavoriteContract(chainId, library);
      setContract(con);

      const len = await con.imagesLength();
      const length = parseInt(len.toString(), 10);

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

      setLoading(false);
    };

    active && library && account && initialize();
  }, [active, library, chainId, account]);

  return (
    <FavoriteContext.Provider
      value={{
        loading,
        contract,
        images,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
