import { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";

import { getFavoriteContract } from "./contract";

const FavoriteState = {};

const FavoriteContext = createContext(FavoriteState);

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const { active, library, chainId } = useWeb3React();

    useEffect(() => {
        const initialize = () => {
            setLoading(true);

            setContract(getFavoriteContract(chainId, library));

            setLoading(false);
        };

        active && library && initialize();
    }, [active, library, chainId]);

    return (
        <FavoriteContext.Provider value={{
            loading,
            contract,
        }}>{children}</FavoriteContext.Provider>
    );
};
