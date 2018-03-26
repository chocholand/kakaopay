import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { configure } from 'mobx'
import * as allStores from './stores'
import registerServiceWorker from './registerServiceWorker'

configure({ enforceActions: true })

ReactDOM.render(<App store={allStores} />, document.getElementById('root'))
registerServiceWorker()
