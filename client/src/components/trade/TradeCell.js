import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const TradeCell = styled.div`
  width: ${props => props.width || '25%'}
  float: left;
  padding: 5px;
`

export default observer(({ children, width }) => (
  <TradeCell width={width}>{children}</TradeCell>
))