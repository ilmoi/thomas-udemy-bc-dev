const MyErc20 = artifacts.require("MyErc20");
const MyTokenSale = artifacts.require("MyTokenSale");
const KYC = artifacts.require('KYC');

require('dotenv').config({path:'../.env'})

module.exports = async function(deployer) {
  //web3 is already available here via truffle
  let addr = await web3.eth.getAccounts()

  await deployer.deploy(MyErc20, process.env.INITIAL_TOKENS);
  await deployer.deploy(KYC);
  //note how we can use MyErc20.address, which is written there as soon as the deployer deploys the contract
  await deployer.deploy(MyTokenSale, 1, addr[0], MyErc20.address, KYC.address)
  //we need to move all the tokens from our MyErc20 contract to our MyTokenSale contract - so that it can distribute them in return for payments
  const instance = await MyErc20.deployed()
  await instance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS)
};
