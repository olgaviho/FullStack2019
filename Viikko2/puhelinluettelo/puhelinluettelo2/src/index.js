import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const persons = [
  {
    id: 1,
    wholename: 'Leo Lindroos',
    date: '2019-01-10T17:30:31.098Z',
    number: '0000'
  }
]

ReactDOM.render(
  <App persons={persons}/>,
  document.getElementById('root')
)
