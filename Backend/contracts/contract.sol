// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Backend {
    string public message;
    event MessageUpdated(string oldMessage, string newMessage);

    function setMessage(string calldata newMessage) external {
        string memory old = message;
        message = newMessage;
        emit MessageUpdated(old, newMessage);
    }

    function getMessage() external view returns (string memory) {
        return message;
    }
}