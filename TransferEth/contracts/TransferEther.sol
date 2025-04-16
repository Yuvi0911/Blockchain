// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferEther {
    // indexed keyword us parameter ko logs me searchable bna deta h.
    // jab smart contract event emit krta h toh data directly on-chain pr store hone ki jagah Ethereum logs me store hota h. Ye logs frontend apps k dvara use kiye jate h certain events ko listen ya filter krne k liye. Maximum 3 parameter 1 event e indexed ho skte h.
    event Transferred(address indexed from, address indexed to, uint amount);

    function transfer(address payable _to) public payable {
        require(msg.value > 0, "Send some ETH");
        _to.transfer(msg.value);
        emit Transferred(msg.sender, _to, msg.value);
    }

    function getBalance(address _addr) public view returns (uint) {
        return _addr.balance;
    }
}