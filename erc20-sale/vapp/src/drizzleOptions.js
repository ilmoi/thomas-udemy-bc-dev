// import SimpleStorage from './contracts/SimpleStorage.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  // contracts: [SimpleStorage, ComplexStorage, TutorialToken],
  // events: {
  //   SimpleStorage: ['StorageSet']
  // },
  polls: {
    accounts: 15000
  }
}

export default options
