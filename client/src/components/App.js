import React from 'react'
import './App.css'
import { Provider } from 'mobx-react'
import styled from 'styled-components'
import TradeContainer from './TradeContainer'

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  
  & > header {
    background-color: #222;
    height: 55px;
    color: white;
    padding: 15px;
  }
  
  &, * {
    box-sizing: border-box;
  }
`

export default class App extends React.Component {

  render() {
    return (
      <Provider {...this.props.store} className="App">
        <AppContainer>
          <header className="App-header">
             <h1 className="App-title">title</h1>
          </header>
          <TradeContainer />
        </AppContainer>
      </Provider>
    );
  }
}
