import { Contract } from "@ethersproject/contracts";

import FavoriteABI from "../../abis/Favorite.json";
import contractAddresses from "./addresses";

export const getFavoriteContract = (chainId, library) => {
    const address = contractAddresses.favorite[chainId];
    return new Contract(address, FavoriteABI, library.getSigner());
};
