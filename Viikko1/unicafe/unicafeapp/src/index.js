import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ allClicks, good, bad, neutral }) => {

  if (allClicks === 0) {
    return (
      <div>
        Ei yhtään palautetta annettu
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Yhteensä:</td>
            <td>{allClicks}</td>
          </tr>
          <tr>
            <td>Keskiarvo: </td>
            <td>{(good - bad) / allClicks}</td>
          </tr>
          <tr>
            <td>Positiivisia: </td>
            <td>{(good) / allClicks * 100} %</td>
          </tr>
          <tr>
            <td>Hyvä: </td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutraali: </td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Huono: </td>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Anna Palautetta</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />

      <h1>Satistiikkaa</h1>
      <Statistics allClicks={allClicks} good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
