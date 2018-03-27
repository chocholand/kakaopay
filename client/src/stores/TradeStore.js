import { action, observable } from 'mobx'
import * as tradeService from '../services/tradeService'
import TradeGroupModel from '../models/TradeGroupModel'

export class TradeStore {
  sellTrades
  buyTrades
  interval
  @observable contractedTrade

  constructor() {
    this.sellTrades = new TradeGroupModel(this, { groupType: 'S' })
    this.buyTrades = new TradeGroupModel(this, { groupType: 'B', orderBy: 'DESC' })
    this.interval = null
  }

  @action.bound
  addTrades(tradeString) {
    let trade = null

    if(tradeString.indexOf('S') > -1) {
      trade = this.buyTrades.consumeTrade(this.sellTrades, tradeString)
      this.sellTrades.addTrade(trade)
    } else {
      trade = this.sellTrades.consumeTrade(this.buyTrades, tradeString)
      this.buyTrades.addTrade(trade)
    }
  }

  @action.bound
  getTrade() {
    return tradeService
      .getTrade()
      .then(({ data }) => {
        this.addTrades(data)
      })
      .catch(() => {
        this.clearIntervalGetTrade()
      })
  }

  initializeTrade() {
    tradeService.initializeTrade()
  }

  setIntervalGetTrade() {
    this.interval = setInterval(this.getTrade, 1000)
  }

  clearIntervalGetTrade() {
    clearInterval(this.interval)
  }

  setContractedTrade(trade) {
    this.contractedTrade = trade
  }
}

const tradeStore = new TradeStore()
export default tradeStore