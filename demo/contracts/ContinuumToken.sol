//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ContinuumToken is ERC721URIStorage {
    enum TokenType {
        CROWN,
        SHIELD
    }

    enum TokenLevel {
        SILVER,
        GOLDEN
    }

    struct CNFT {
        uint256 tokenId;
        string tokenURI;
        TokenLevel tokenLevel;
        TokenType tokenType;
    }

    CNFT[] public nfts;
    uint256 public nftCount;
    uint256 public fee;

    mapping (TokenType => mapping(TokenLevel => string)) public URIs;

    constructor() ERC721("ContinuumToken", "CTT") {
        fee = 0.01 ether;
        nftCount = 0;

        URIs[TokenType.CROWN][TokenLevel.SILVER] = "https://i.ibb.co/WHHwZ2F/3d-realistic-silver-crown-Vector-illustration.jpg";
        URIs[TokenType.CROWN][TokenLevel.GOLDEN] = "https://i.ibb.co/SRpw47S/Icon-of-queen-or-king-princess-or-prince-monarch-or-duke-marquis-or-pope-emperor-crown-Golden-headdr.jpg";
        URIs[TokenType.SHIELD][TokenLevel.SILVER] = "https://i.ibb.co/zrNJYYX/silver-shield.jpg";
        URIs[TokenType.SHIELD][TokenLevel.GOLDEN] = "https://i.ibb.co/SRpw47S/Icon-of-queen-or-king-princess-or-prince-monarch-or-duke-marquis-or-pope-emperor-crown-Golden-headdr.jpg";
    }

    function mint(TokenType _type) external returns(uint256) {
        CNFT memory nft;
        nft.tokenId = nftCount;
        nft.tokenURI = URIs[_type][TokenLevel.SILVER];
        nft.tokenLevel = TokenLevel.SILVER;
        nft.tokenType = _type;
        nfts.push(nft);
        nftCount ++;

        _safeMint(msg.sender, nft.tokenId);
        _setTokenURI(nft.tokenId, nft.tokenURI);

        return nft.tokenId;
    }

    function upgrade(uint256 _tokenId) external payable {
        require(msg.value == fee, "Invalid fee");
        require(msg.sender == ownerOf(_tokenId), "Only owner can upgrade");

        nfts[_tokenId].tokenURI = URIs[nfts[_tokenId].tokenType][TokenLevel.GOLDEN];
        nfts[_tokenId].tokenLevel = TokenLevel.GOLDEN;

        _setTokenURI(nfts[_tokenId].tokenId, nfts[_tokenId].tokenURI);
    }
}
