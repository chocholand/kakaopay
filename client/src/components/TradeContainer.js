import React from 'react'
import styled from 'styled-components'
import { TradeRows, TradeCell } from './trade'
import { inject, observer } from 'mobx-react'

const TradeContainerWrap = styled.div`
 width: 600px;
 margin: 10px auto;
 padding: 15px;
 background: #ddd;
 &::after {
   content: "";
   clear: both;
   display: table;
 }
`

const TradeHeader = styled.div`

`
@inject('tradeStore') @observer
export default class TradeContainer extends React.Component {
  constructor(props) {
    super(props)

    this.tradeStore = this.props.tradeStore
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <TradeContainerWrap>
        <TradeHeader>
          <TradeCell>매도수량</TradeCell>
          <TradeCell>매도가격</TradeCell>
          <TradeCell>매수가격</TradeCell>
          <TradeCell>매수수량</TradeCell>
        </TradeHeader>
        <TradeRows />
      </TradeContainerWrap>
    )
  }
}