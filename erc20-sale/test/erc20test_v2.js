const Erc20 = artifacts.require('MyErc20')
const MyTokenSale = artifacts.require('MyTokenSale')
const MyKYC = artifacts.require('KYC')
const truffleAssert = require('truffle-assertions');

//so writing tests using expect() both looks ugly and doesn't seem to work correctly (I think something to do with BNs...)
//this way (which is also rec'ed in the docs) works ok though


contract("token test", async (accounts) => {
  const [sender, receiver] = accounts

  it('all tokens should be in my account', async () => {
    //MOVE MONEY BACK TO SENDER - QUICK HACK
    //instantiate contracts (no you can't move this outside of "it" fns, it breaks)
    const erc20Instance = await Erc20.deployed()
    const saleInstance = await MyTokenSale.deployed()
    const KYCInstance = await MyKYC.deployed()
    //whitelist the sender's account
    await KYCInstance.setKycCompleted(sender)
    //move the tokens back to sender
    await saleInstance.sendTransaction({from: sender, value: 9999})

    const totalSupply = await erc20Instance.totalSupply()
    let balance = await erc20Instance.balanceOf(sender)

    assert.equal(balance.toNumber(), totalSupply.toNumber())
  })

  it('sends the correct amount', async () => {
    const erc20Instance = await Erc20.deployed()
    const sendAmount = 1111;

    const beforeSender = await erc20Instance.balanceOf(sender);
    const beforeReceiver = await erc20Instance.balanceOf(receiver);

    await erc20Instance.transfer(receiver, sendAmount);

    const afterSender = await erc20Instance.balanceOf(sender);
    const afterReceiver = await erc20Instance.balanceOf(receiver);

    assert.equal(beforeSender.toNumber(), 9999);
    assert.equal(beforeReceiver.toNumber(), 0);
    assert.equal(afterReceiver.toNumber(), 1111);
    assert.equal(afterSender.toNumber(), 8888);
  })

  it('fails if exceeds token number', async () => {
    const erc20Instance = await Erc20.deployed()
    let balanceOfDeployer = await erc20Instance.balanceOf(sender)

    //test a failed function
    //as per answer here - https://ethereum.stackexchange.com/questions/48627/how-to-catch-revert-error-in-truffle-test-javascript
    await truffleAssert.reverts(erc20Instance.transfer(receiver, 8888 + 1))
  })
})