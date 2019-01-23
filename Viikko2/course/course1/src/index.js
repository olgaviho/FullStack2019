import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/course'

import axios from 'axios'




const App = () => {

  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          name: 'Komponenttien tila',
          exercises: 14
        },
        {
          name: 'propsit',
          exercises: 3
        }
      ]
    },
    {
      name: 'Tikape',
      parts: [
        {
          name: 'indeksit',
          exercises: 5
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))

