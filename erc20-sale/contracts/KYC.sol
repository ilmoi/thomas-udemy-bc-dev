// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract KYC is Ownable {
    mapping(address => bool) allowed;
    
    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }
    
    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }
    
    function checkKycCompleted(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}