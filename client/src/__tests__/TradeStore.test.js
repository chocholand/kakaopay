import { TradeStore } from "../stores/TradeStore"

describe("TradeStore", () => {
  it("gets new trades", async () => {
    const store = new TradeStore
    await store.getTrade()
    await store.getTrade()
    expect(store.sellTrades.length + store.buyTrades.length).toBe(2)
    expect(store.sellTrades[0].tradeType).toBe('S')
    expect(store.buyTrades[0].tradeType).toBe('B')
  })
})