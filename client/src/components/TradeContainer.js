import React from 'react'
import styled from 'styled-components'
import { TradeRows, TradeCell } from './trade'
import { inject, observer } from 'mobx-react'

const TradeContainerWrap = styled.div`
 width: 500px;
 margin: 10px auto;
 padding: 15px;
 background: #ddd;
 position: relative;
 &::after {
   content: "";
   clear: both;
   display: table;
 }
`
const TradeHeader = styled.div`
  &::after {
   content: "";
   clear: both;
   display: table;
 }
`

const Button = styled.button`
  padding: 5px;
  margin: 10px;
`

@inject('tradeStore') @observer
export default class TradeContainer extends React.Component {
  constructor(props) {
    super(props)

    this.tradeStore = this.props.tradeStore
  }

  componentWillMount() {
    this.tradeStore.initializeTrade()
  }

  componentWillUnmount() {
    this.tradeStore.clearIntervalGetTrade()
  }

  render() {

    const { sellTrades, buyTrades, contractedTrade } = this.tradeStore

    return (
      <TradeContainerWrap>
        <Button type="button" onClick={() => this.tradeStore.setIntervalGetTrade()}>시작하기</Button>
        <Button type="button" onClick={() => this.tradeStore.clearIntervalGetTrade()}>중지</Button>
        <TradeHeader>
          <TradeCell>매도수량</TradeCell>
          <TradeCell>매도가격</TradeCell>
          <TradeCell>매수가격</TradeCell>
          <TradeCell>매수수량</TradeCell>
        </TradeHeader>
        <div style={{ position: 'relative' }}>
          <TradeRows tradeGroup={sellTrades} tradeType="S" contractedTrade={contractedTrade} />
          <TradeRows tradeGroup={buyTrades} tradeType="B" contractedTrade={contractedTrade} />
        </div>
      </TradeContainerWrap>
    )
  }
}