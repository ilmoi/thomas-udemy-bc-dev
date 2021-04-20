<template>
  <div>
    <h1>erc20</h1>
    <div>My address: {{ myAddress }}</div>
    <div>Name: {{ tknName }}</div>
    <div>Symbol: {{ tknSymbol }}</div>
    <div>Supply: {{ totalSupply }}</div>
    <br/>
    <!------------------------------------------------------------->
    <!--  burn-->
    <form>
      <input type="text" v-model="burnAmount"/>
      <button @click.prevent="burnIt">burn</button>
    </form>
    <br/>
    <!--  transfer-->
    <form>
      <input type="text" v-model="transferAmount"/>
      <input type="text" v-model="toAccount"/>
      <button @click.prevent="transferIt">transfer</button>
    </form>
    <br/>
    <!--  transfer from-->
    <form>
      <input type="text" v-model="transferAmount"/>
      <input type="text" v-model="fromAccount"/>
      <input type="text" v-model="toAccount"/>
      <button @click.prevent="transferFrom">transfer from</button>
    </form>
    <br/>
    <!------------------------------------------------------------->
    <!--input an account-->
    <label for="spender">Target address: </label>
    <input type="text" id="spender" v-model="targetAddress">
    <br/>
    <!--balance of-->
    {{ balance }}
    <button @click="getBalance">balance of</button>
    <br/>
    <!--  allowance of-->
    {{ allowance }}
    <button @click="getAllowance">allowance of</button>
    <br/>
    <!--  incr allowance-->
    <form>
      <input type="text" v-model="incrAmount"/>
      <button @click.prevent="incrIt">incr allowance</button>
    </form>
    <br/>
    <!--  decr allowance-->

    <!------------------------------------------------------------->
    <h1>kyc</h1>
    <!-- set kyc -->
    <form>
      <input type="text" v-model="kycAddress">
      <button @click.prevent="whitelistAddr">whitelist</button>
    </form>
    <!-- revoke kyc -->
    <form>
      <input type="text" v-model="kycAddress">
      <button @click.prevent="revokeAddr">revoke</button>
    </form>
    <!------------------------------------------------------------->
    <h1>crowdsale</h1>
    <!-- contract's own address - this is where you pay -->
    <p>Ctr address (PAY HERE): {{ MyTokenSaleInstance ? MyTokenSaleInstance.address : '' }}</p>
    <!-- token -->
    <p>Token address (ADD TO METAMASK): {{ saleToken }}</p>
    <!-- wallet - this is where funds end up -->
    <p>Wallet (FUNDS END UP HERE): {{ saleWallet }}</p>
    <!-- rate -->
    <p>Rate: {{ saleRate }}</p>
    <!-- weiRaised -->
    <p>Raised: {{ saleRaised }}</p>
    <!-- buytokens -->
    <form>
      <input type="text" v-model="saleAmount"/>
      <button @click.prevent="enterSale">enter sale!</button>
    </form>

  </div>
</template>

<script>
const Web3 = require('web3')
let web3, provider; //these get assigned later, in the created() hook

const contract = require('truffle-contract')
const erc20Json = require('@/contracts/MyErc20.json')
const saleJson = require('@/contracts/MyTokenSale.json')
const kycJson = require('@/contracts/KYC.json')

export default {
  data() {
    return {
      //contract instances
      MyErc20Instance: null,
      MyTokenSaleInstance: null,
      MyKYCInstance: null,
      //addresses
      accounts: [],
      erc20Instance: null,
      myAddress: null, //populated from accounts
      targetAddress: null, //populated from accounts
      //token stuff
      tknName: null,
      tknSymbol: null,
      totalSupply: null,
      burnAmount: 1,
      incrAmount: 3,
      transferAmount: 123,
      fromAccount: null, //populated from accounts
      toAccount: null, //populated from accounts
      balance: 0,
      allowance: 0,
      //kyc stuff
      kycAddress: null,
      //sale stuff
      saleToken: null,
      saleWallet: null,
      saleRate: null,
      saleRaised: null,
      saleAmount: 0,
    }
  },
  methods: {
    // -----------------------------------------------------------------------------
    // general functions
    async sendTx(to, ethAmount) {
      const result = await web3.eth.sendTransaction({
        from: this.myAddress,
        to: to,
        value: web3.utils.toWei(ethAmount.toString(), 'ether'),
      })
      console.log(result)
      return result
    },
    async contractCall(fnName, fnArgs = []) {
      const result = await this.erc20Instance.methods[fnName](...fnArgs).call()
      console.log(result)
      return result
    },
    async contractSend(fnName, fnArgs = [], value = null) {
      const txObj = {
        from: this.myAddress,
        gasPrice: '20', //optional
        gas: 5000000, //optional
        value: value, //optional
      }
      const result = await this.erc20Instance.methods[fnName](...fnArgs).send(txObj)
      console.log(result)
      return result
    },
    async refreshData() {
      this.tknName = await this.contractCall('name')
      this.tknSymbol = await this.contractCall('symbol')
      this.totalSupply = await this.contractCall('totalSupply')
      this.saleToken = await this.MyTokenSaleInstance.token()
      this.saleWallet = await this.MyTokenSaleInstance.wallet()
      this.saleRate = await this.MyTokenSaleInstance.rate()
      this.saleRaised = await this.MyTokenSaleInstance.weiRaised()
    },
    // -----------------------------------------------------------------------------
    // token stuff
    async burnIt() {
      await this.contractSend('burn', [this.burnAmount])
      await this.refreshData()
    },
    async transferIt() {
      // old way, using web3
      // await this.contractSend('transfer',[this.toAccount, this.transferAmount])
      //new way, using truffle-contract
      await this.MyErc20Instance.transfer(this.toAccount, this.transferAmount, {from: this.myAddress})
      await this.refreshData()
    },
    async transferFrom() {
      await this.contractSend('transferFrom', [this.fromAccount, this.toAccount, this.transferAmount])
      await this.refreshData()
    },
    async getBalance() {
      this.balance = await this.contractCall('balanceOf', [this.targetAddress])
    },
    async getAllowance() {
      this.allowance = await this.contractCall('allowance', [this.myAddress, this.targetAddress])
    },
    async incrIt() {
      await this.contractSend('increaseAllowance', [this.targetAddress, this.incrAmount])
      await this.refreshData()
    },
    // -----------------------------------------------------------------------------
    //kyc stuff
    async whitelistAddr() {
      const result = await this.MyKYCInstance.setKycCompleted(this.kycAddress, {from: this.myAddress})
      console.log(result)
    },
    async revokeAddr() {
      const result = await this.MyKYCInstance.setKycRevoked(this.kycAddress, {from: this.myAddress})
      console.log(result)
    },
    // -----------------------------------------------------------------------------
    //sale stuff
    async enterSale() {
      //either of 2 approaches below works
      // await this.MyTokenSaleInstance.sendTransaction({from:this.myAddress, value: this.saleAmount})
      await this.MyTokenSaleInstance.buyTokens(this.myAddress, {
        from: this.myAddress,
        value: this.saleAmount
      })
    },

    // -----------------------------------------------------------------------------
    // event listener
    listenForTransfer() {
      //listens for transfers to target address only, then logs them
      this.MyErc20Instance.Transfer({to: this.targetAddress}).on("data", async (e) => {
        console.log('TRANSFER HAPPENED')
        console.log(e)
        await this.getBalance()
      })
    },
  },
  computed: {},
  async created() {
    //as per https://www.youtube.com/watch?v=LzdMosLzj80
    //to do it really properly look at getWeb3.js from truffle's react box
    if (window.ethereum) { //latest version of MM
      provider = window.ethereum
      web3 = new Web3(provider) //create new web3 obj from MM
      await ethereum.enable() //allow web app to access MM (user pop up)
    } else if (window.web3) { //older versions of MM and other wallets
      provider = window.web3.currentProvider
      web3 = new Web3(provider)
    }

    //accounts
    // console.log(web3.eth.defaultAccount) //null - doesn't work
    // console.log(web3.eth.accounts[0]) //undefined - doesn't work
    this.accounts = await web3.eth.getAccounts() //works!
    console.log(`accounts are: ${this.accounts}`)
    this.myAddress = this.fromAccount = this.accounts[0]
    this.targetAddress = this.toAccount = this.accounts[0]

    //network
    const networkId = await web3.eth.net.getId()
    console.log(`network is ${networkId}`)

    //deploy SC using web3
    //thomas talks about it in this video - https://www.udemy.com/course/blockchain-developer/learn/lecture/18291412#overview
    //thomas said this is preferred way over truffle-contract
    // I didn't bother deploying the other 2, but it would be the same
    const erc20DeployedNetwork = erc20Json.networks[networkId]
    this.erc20Instance = new web3.eth.Contract(
        erc20Json.abi,
        erc20DeployedNetwork && erc20DeployedNetwork.address,
    )

    //deploy SC using truffle-contract
    const MyErc20 = contract(erc20Json)
    const MyTokenSale = contract(saleJson)
    const MyKYC = contract(kycJson)
    await MyErc20.setProvider(provider) //not sure if await necesasry here
    await MyTokenSale.setProvider(provider)
    await MyKYC.setProvider(provider)
    this.MyErc20Instance = await MyErc20.deployed()
    this.MyTokenSaleInstance = await MyTokenSale.deployed()
    this.MyKYCInstance = await MyKYC.deployed()

    await this.refreshData()
    this.listenForTransfer()
  }
}
</script>

<style scoped>
</style>