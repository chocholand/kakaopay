import { observable } from 'mobx'

export default class TradeModel {
  tradeType
  price
  count

  constructor(store, trade) {
    const [tradeType, price, count] = trade.replace(/\s+/g, ' ').split(' ')
    this.store = store
    this.tradeType = tradeType
    this.price = price
    this.count = count
  }
}