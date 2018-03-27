import { action, observable } from 'mobx'
import TradeModel from '../models/TradeModel'

export default class TradeGroupModel {
  groupType
  orderBy
  @observable trades

  constructor(store, { groupType, orderBy = 'ASC' }) {
    this.store = store
    this.groupType = groupType
    this.orderBy = orderBy
    this.trades = []
  }

  consumeTrade(grouModel, tradeString) {
    const trade = new TradeModel(grouModel, tradeString)
    this.trades
      .filter(({price}) => this.orderByExpression(price, trade.price))
      .forEach(tradeModel => {
        tradeModel.contract(trade)
      })

    return trade
  }

  remove(tradeModel) {
    this.trades.remove(tradeModel)
  }

  setContractedTrade(trade) {
    this.store.setContractedTrade(trade)
  }

  @action
  addTrade(trade) {
    if(trade.count <= 0) return false;
    const tradeModel = this.trades.filter(({price}) => price === trade.price)[0]
    if(tradeModel) {
      tradeModel.update(tradeModel.count + trade.count)
    } else {
      this.trades.push(trade)
      this.trades.replace(this.trades.sort((a, b) => !this.orderByExpression(a.price, b.price)))
    }
  }

  orderByExpression(a, b) {
    return this.orderBy === 'ASC' ? a <= b : a >= b
  }
}