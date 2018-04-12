import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className="App">

      </div>
    )
  }
}

class Test extends Component {
  render () {
    return (
      <div>
        <App>
          <h1>这部分是测试内容</h1>
        </App>
      </div>
    )
  }
}

export default Test
