import { Contract } from "@ethersproject/contracts";

import FavoriteABI from "../../abis/Favorite.json";
import TokenABI from "../../abis/Token.json";
import contractAddresses from "./addresses";

export const getFavoriteContract = (chainId, library) => {
    const address = contractAddresses.favorite[chainId];
    return new Contract(address, FavoriteABI, library.getSigner());
};

export const getTokenContract = (chainId, library) => {
    const address = contractAddresses.token[chainId];
    return new Contract(address, TokenABI, library.getSigner());
};
