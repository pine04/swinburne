// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;

import "./ERC721Full.sol";

/*
    Name: Ta Quang Tung
    Student ID: 104222196
    Description: The smart contract that will handle the minting, reading, and transfer of NFTs.
*/

contract Dripple is ERC721Full {
    // A counter to generate token IDs.
    uint256 private _nextTokenId;
    // A mapping from string to boolean to check if the provided NFT already exists.
    mapping (string => bool) _nftExists;

    constructor() ERC721Full("Dripple", "DRP") public { }

    // Safely mints an NFT based on a string supplied by the caller.
    // This operation costs 0.5 ETH.
    // The resulting token ID will be returned for storage in the database.
    function safeMint(string memory drippleAsset) public payable returns(uint256) {
        require(!_nftExists[drippleAsset], "This NFT has been already been minted.");
        require(msg.value >= 0.5 ether, "Minting an asset requires at least 0.5 DRP in your balance.");

        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _nftExists[drippleAsset] = true;
        return tokenId;
    }

    // Transfers ownership of an NFT to another address.
    // The old owner also receives the money sent in the request.
    function purchaseNFT(address payable from, uint256 tokenId) public payable {
        require (msg.sender != from, "You cannot purchase an NFT from yourself!");
        from.transfer(msg.value);
        safeTransferFrom(from, msg.sender, tokenId);
    }

    // Returns a list of NFTs owned by an address.
    function getOwnedAssets(address user) public view returns(uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory assets = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            assets[i] = tokenOfOwnerByIndex(user, i);
        }

        return assets;
    }
}

