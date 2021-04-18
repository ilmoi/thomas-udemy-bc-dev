// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Simple {
    event CountChanged(string _message);
    
    uint public count = 10;
 
    function setCount(uint _newCount) public {
        count = _newCount;
        emit CountChanged("new count set!");
    }
    
    function incr() public {
        count++;
        emit CountChanged("count INCRemented!");
    }
    
    function decr() public {
        count--;
        emit CountChanged("count DECRemented!");
    }
    
}