import SimpleStorage from './contracts/SimpleStorage.json'
import ComplexStorage from './contracts/ComplexStorage.json'
import TutorialToken from './contracts/TutorialToken.json'
import Simple from './contracts/Simple.json'

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [SimpleStorage, ComplexStorage, TutorialToken, Simple],
  events: {
    SimpleStorage: ['StorageSet'],
    Simple: ['CountChanged']
  },
  polls: {
    accounts: 15000
  }
}

export default options
