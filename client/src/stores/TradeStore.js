import { action, observable } from 'mobx'
import * as tradeService from '../services/tradeService'
import TradeModel from '../models/TradeModel'

export class TradeStore {
  @observable sellTrades
  @observable buyTrades

  constructor() {
    this.sellTrades = []
    this.buyTrades = []
  }

  @action
  addTrades(name, trade) {
    this[name].push(trade)
  }

  @action
  getTrade() {
    return tradeService
      .getTrade()
      .then(({ data }) => {
        const trade = new TradeModel(this, data)
        this.addTrades(trade.tradeType === 'S' ? 'sellTrades' : 'buyTrades', trade)
      })
  }
}

const tradeStore = new TradeStore()
export default tradeStore