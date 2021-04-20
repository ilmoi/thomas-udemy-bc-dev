pragma solidity ^0.8.0;

import "./Crowdsale.sol";
import "./KYC.sol";

contract MyTokenSale is Crowdsale {

    KYC kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KYC _kyc
    )
        Crowdsale(rate, wallet, token)
        public
    {
        kyc = _kyc;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.checkKycCompleted(beneficiary), "not KYCed");
    }
    
}