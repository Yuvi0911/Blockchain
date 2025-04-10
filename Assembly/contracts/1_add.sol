//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Add {
    function addViaAssembly(uint a, uint b) public pure returns(uint result){
        // assembly k andar hum low-level EVM instructions write kr skte h smart contract k andar jis se performance boosts, direct memory access aur more control hoga.
        assembly {
            // add(a, b) => ye EVM opcode h.
            // := ye result variable me value assign kr dega.
            result := add(a,b)
        }
    }
}