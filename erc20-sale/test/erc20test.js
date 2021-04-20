// const Erc20 = artifacts.require('MyErc20')
// const chai = require('chai')
//
// const BN = web3.utils.BN
// const chaiBN = require('chai-bn')(BN)
// chai.use(chaiBN)
//
// const chaiAsPromised = require('chai-as-promised')
// chai.use(chaiAsPromised)
//
// const expect = chai.expect
//
// contract("token test", async (accounts) => {
//   const [sender, receiver] = accounts;
//
//   it('all tokens should be in my account', async () => {
//     const instance = await Erc20.deployed()
//     const totalSupply = await instance.totalSupply()
//     let balance = await instance.balanceOf(accounts[0])
//
//     // assert.equal(balance.valueOf(), totalSupply.valueOf()) - DOESNT WORK FOR SOME REASON
//     expect(balance).to.be.a.bignumber.equal(totalSupply)
//     expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply)
//   })
//
//   it('sends the correct amount', async () => {
//     const instance = await Erc20.deployed()
//     const sendAmount = new BN(123)
//     const totalSupply = await instance.totalSupply()
//
//     //check initially
//     expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(totalSupply)
//     //do the transfer
//     expect(instance.transfer(receiver, sendAmount)).to.eventually.be.fulfilled
//     //check again post transfer
//     expect(instance.balanceOf(sender)).to.eventually.be.a.bignumber.equal(totalSupply.sub(sendAmount))
//     expect(instance.balanceOf(receiver)).to.eventually.be.a.bignumber.equal(sendAmount)
//
//     //todo this test passes no matter what number I put there... not sure wtf
//
//   })
//
//   it('fails if exceeds token number', async () => {
//     const instance = await Erc20.deployed()
//     let balanceOfDeployer = await instance.balanceOf(sender)
//
//     expect(instance.transfer(receiver, new BN(balanceOfDeployer+1))).to.eventually.be.rejected
//
//     //todo even fucking weirder - this test makes the previous fail
//     // ULTIMATE WEIRDNESS - MOVE TESTS AROUND, AND IT WORKS
//   })
//
//   //todo ok tests dont work, at least not when I follow thomas's videos
//
// })