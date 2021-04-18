// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import './Ownable.sol';

contract Item {
    // collects the payment and sends it over to ItemManager
    
    uint public index;
    uint public priceInWei;
    ItemManager parentContract;
    
    constructor(ItemManager _parentContract, uint _index, uint _priceInWei) public {
        index = _index;
        priceInWei = _priceInWei;
        parentContract = _parentContract;
    }
    
    receive() external payable {
        require(priceInWei <= msg.value, "only full OR MORE payments allowed");
        
        // this line alone wouldn't be enough coz we don't know which item got paid for
        // address(parentContract).transfer(msg.value);
        
        // so instead we do a low level call, which we can use to also call a fn in parent contract
        // the reason we couldn't do it with the line above is because .transfer sends exactly 21000 gas, so not enough left for contract execution
        // note this is a low level call so we have to manually listen for the return value
        (bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "tx failed");
    }
    
    // needed for remix to interact with the SC
    fallback() external {}
    
}

contract ItemManager is Ownable{

    enum SupplyChainSteps{Created, Paid, Delivered}

    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        string _identifier;
        uint _priceInWei;
    }
    mapping(uint => S_Item) public items;
    uint index;

    event SupplyChainStep(uint _itemIndex, uint _step, address _deliveryAddress);

    function createItem(string memory _identifier, uint _priceInWei) public onlyOwner {
        Item item = new Item(this, index, _priceInWei);
        items[index]._item = item;
        items[index]._priceInWei = _priceInWei;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;
        emit SupplyChainStep(index, uint(items[index]._step), address(item));
        index++;
    }

    function triggerPayment(uint _index) public payable {
        require(items[_index]._priceInWei <= msg.value, "Not fully paid");
        require(items[_index]._step == SupplyChainSteps.Created, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStep(index, uint(items[index]._step), address(items[_index]._item));
    }

    function triggerDelivery(uint _index) public onlyOwner {
        require(items[_index]._step == SupplyChainSteps.Paid, "Item is further in the supply chain");
        items[_index]._step = SupplyChainSteps.Delivered;
        emit SupplyChainStep(index, uint(items[index]._step), address(items[_index]._item));
    }
}