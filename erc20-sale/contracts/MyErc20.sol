// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract MyErc20 is ERC20PresetFixedSupply {
    constructor(uint initial_tokens) ERC20PresetFixedSupply('ilja','ILM',initial_tokens, msg.sender) {
    }
}
