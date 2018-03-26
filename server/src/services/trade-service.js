import { NotFound } from 'fejl'

/**
 * Trade Service.
 * Gets a trade store injected.
 */
export default class TradeService {
  constructor(tradeStore) {
    this.tradeStore = tradeStore
  }

  async getRecent(filePath) {
    return this.tradeStore
      .getRecent(filePath)
      .then(NotFound.makeAssert(`Trade not found`))
  }
}
