import { TradeStore } from '../stores/TradeStore'

describe("TradeStore", () => {
  it("gets new trades", async () => {
    const store = new TradeStore
    await store.getTrade()
    await store.getTrade()
    expect(store.sellTrades.trades.length + store.buyTrades.trades.length).toBe(2)
    expect(store.sellTrades.trades[0].tradeType).toBe('S')
    expect(store.buyTrades.trades[0].tradeType).toBe('B')
  })

  it("consume trade", async () => {
    const store = new TradeStore
    store.addTrades('S 150 800')
    store.addTrades('B 150 1000')

    expect(store.sellTrades.trades.length).toBe(0)
    expect(store.buyTrades.trades.length).toBe(1)
    expect(store.buyTrades.trades[0].getJSONStringify()).toBe('B 150 200')
  })

  it("sort trade", async () => {
    const store = new TradeStore
    store.addTrades('S 150 800')
    store.addTrades('S 100 10')
    store.addTrades('S 170 1000')

    expect(store.sellTrades.trades.length).toBe(3)
    expect(store.sellTrades.trades[0].getJSONStringify()).toBe('S 100 10')
    expect(store.sellTrades.trades[1].getJSONStringify()).toBe('S 150 800')
    expect(store.sellTrades.trades[2].getJSONStringify()).toBe('S 170 1000')
  })

  it("contract trade", async () => {
    const store = new TradeStore
    store.addTrades('B 150 1000')
    store.addTrades('S 160 800')
    store.addTrades('B 151 1000')
    store.addTrades('S 170 800')
    store.addTrades('B 140 1000')
    store.addTrades('S 200 800')
    store.addTrades('B 170 1200')

    expect(store.sellTrades.trades.length).toBe(2)
    expect(store.buyTrades.trades.length).toBe(3)
    expect(store.sellTrades.trades[0].getJSONStringify()).toBe('S 170 400')
    expect(store.sellTrades.trades[1].getJSONStringify()).toBe('S 200 800')
    expect(store.buyTrades.trades[0].getJSONStringify()).toBe('B 151 1000')
    expect(store.buyTrades.trades[1].getJSONStringify()).toBe('B 150 1000')
    expect(store.buyTrades.trades[2].getJSONStringify()).toBe('B 140 1000')
  })
})