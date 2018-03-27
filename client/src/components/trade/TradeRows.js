import React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import { TradeCell } from './'

const TradeRowsWrap = styled.div`
  position: relative;
  background: ${props => props.tradeType === 'S' ? '#f5faff' : '#fff5f8'};
  color: #d60000;
  height: 300px;
  padding-top: 2px;
  
  & > div {
    border: 2px solid ${props => props.tradeType === 'S' ? '#f5faff' : '#fff5f8'};
  }
`

const Row = styled.div`
  width: 100%;
 
  &::after {
   content: "";
   clear: both;
   display: table;
 }
`

@observer
export default class TradeRows extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tradeGroup, tradeType, contractedTrade = {} } = this.props
    const { trades } = tradeGroup

    const RowComponent = tradeType === 'S' ? LeftRow : RightRow

    return (
      <TradeRowsWrap tradeType={tradeType}>
        {
          trades.map((trade, idx) => {

            console.log('contractedTrade', contractedTrade.price, trade.price)
            return (
              <RowComponent key={trade.price} {...trade} idx={idx} isContracted={contractedTrade.price === trade.price} />
            )
          })
        }
      </TradeRowsWrap>
    )
  }
}

const LeftRow = observer(({price, count, idx, isContracted}) => (
  <Row style={{ position: 'absolute', bottom: 34 * idx, border: isContracted && '2px solid #bbb' }}>
    <TradeCell key={price + 'count'}>{count}</TradeCell>
    <TradeCell key={price + 'price'}>{price}</TradeCell>
    <TradeCell key={price + 'empty1'}/>
    <TradeCell key={price + 'empty2'}/>
  </Row>
))

const RightRow = observer(({price, count, isContracted}) => (
  <Row style={{ border: isContracted && '2px solid #bbb' }} >
    <TradeCell key={price + 'empty1'}/>
    <TradeCell key={price + 'empty2'}/>
    <TradeCell key={price + 'price'}>{price}</TradeCell>
    <TradeCell key={price + 'count'}>{count}</TradeCell>
  </Row>
))