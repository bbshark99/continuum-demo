import { Web3ReactProvider } from "@web3-react/core";
import { FavoriteProvider } from "./context/favorite";
import { getLibrary } from "./utils/web3";

const Providers = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <FavoriteProvider>
                {children}
            </FavoriteProvider>
        </Web3ReactProvider>
    );
};

export default Providers;
