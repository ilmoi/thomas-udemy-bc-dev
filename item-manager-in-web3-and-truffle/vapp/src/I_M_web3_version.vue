<template>
  <div>
    <h1>Item Manager built in web3.js</h1>

    Result of last call:
    {{result}}

    <p>Send tx:</p>
    <form>
      <input type="text" v-model="txValue"/>
      <input type="text" v-model="toAddr"/>
      <button @click.prevent="sendTx(toAddr, txValue)">send</button>
    </form>

    <p>Create the item:</p>
    <form>
      <input type="text" v-model="itemName"/>
      <input type="text" v-model="itemCost"/>
      <button @click.prevent="contractSend('createItem',[itemName, itemCost])">create</button>
    </form>

    <br/>
    <p>NOTE: you query by identifier (automatically incremented UINT), which is NOT the same as item name.</p>
    <p>To find identifier look out for "_itemIndex" when item is created.</p>

    <p>Display the item (low level):</p>
    <form>
      <input type="text" v-model="itemId"/>
      <button @click.prevent="callContractLowLevel(contract.options.address, 'items(uint256)', itemId)">display</button>
    </form>

    <p>Display the item (high level):</p>
    <form>
      <input type="text" v-model="itemId"/>
      <button @click.prevent="contractCall('items(uint256)', [itemId])">display</button>
    </form>

    <p>Pay for the item:</p>
    <form>
      <input type="text" v-model="itemId"/>
      <input type="text" v-model="payAmountWei"/>
      <button @click.prevent="contractSend('triggerPayment', [itemId], payAmountWei)">pay</button>
    </form>

    <p>Ship the item::</p>
    <form>
      <input type="text" v-model="itemId"/>
      <button @click.prevent="contractSend('triggerDelivery', [itemId])">deliver</button>
    </form>

  </div>
</template>

<script>
import Web3 from 'web3'
import im_contract from '@/contracts/ItemManager.json'
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

export default {
  data() {
    return {
      txValue: 0,
      itemId: 5,
      itemName: 'NameMePls',
      itemCost: 123,
      payAmountWei: 123,
      contract: null,
      result: null,
      myAddress: '0xF429B1D00678b9e60536F832E312f38B593E8b3c',
      toAddr: '0x343e4628d073e1774133dD70F87FD42361F1c050'
    }
  },
  methods: {
    sendTx(to, ethAmount) {
      web3.eth.sendTransaction({
        from: this.myAddress,
        to: to,
        value: web3.utils.toWei(ethAmount.toString(), 'ether'),
      }).then(result => {
        console.log(result)
        this.result = result
      })
    },
    callContractLowLevel(to, rawFn, fnArg) {
      // manually assembling the data payload for ethereum contract call
      // half way through this - https://github.com/ethereumbook/ethereumbook/blob/develop/06transactions.asciidoc
      const fourByteFn = web3.utils.sha3(rawFn).substr(0, 10)
      const hexArg = web3.utils.toHex(fnArg.toString()).substr(2,) //substr removes 0x from start
      const bytesToPad = 32 * 2 - hexArg.length //2x coz bytex -> hex (we would 8x for bytes -> bin)
      const finalData = fourByteFn + '0'.repeat(bytesToPad) + hexArg
      console.log(finalData)

      web3.eth.call({
        from: this.myAddress,
        to: to,
        data: finalData
      }).then(result => {
        console.log(result)
        this.result = result
      })
    },
    contractCall(fnName, fnArgs) {
      this.contract.methods[fnName](...fnArgs).call().then(result => {
        console.log(result)
        this.result = result
      })
    },
    contractSend(fnName, fnArgs, value=null) {
      const txObj = {
        from: this.myAddress,
        gasPrice: '20', //optional
        gas: 5000000, //optional
        value: value, //optional
      }
      this.contract.methods[fnName](...fnArgs).send(txObj).then(result => {
        console.log(result)
        this.result = result
      })
    }
  },
  created() {
    this.contract = new web3.eth.Contract(im_contract.abi, im_contract.networks["5777"].address)
  }
}
</script>

<style scoped>

</style>