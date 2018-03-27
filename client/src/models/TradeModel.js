import { action, observable } from 'mobx'

export default class TradeModel {
  groupModel
  tradeType
  price
  @observable count

  constructor(groupModel, trade) {
    const [tradeType, price, count] = trade.replace(/\s+/g, ' ').split(' ')
    this.groupModel = groupModel
    this.tradeType = tradeType
    this.price = parseInt(price)
    this.count = parseInt(count)
  }

  getJSONStringify() {
    return `${this.tradeType} ${this.price} ${this.count}`
  }

  remove() {
    this.groupModel.remove(this)
  }

  @action.bound
  update(count, trade) {
    this.count = count
    // if(this.count > count) {
    //   this.groupModel.setContractedTrade(trade || this)
    // }
  }

  @action
  contract(trade) {
    this.count -= trade.count
    if(this.count <= 0) {
      trade.update(this.count * -1, trade)
      this.remove()
    } else {
      trade.update(0)
    }
  }

}