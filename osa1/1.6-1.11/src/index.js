import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  const sections = {
    buttonTexts: [
      "hyvä",
      "neutraali",
      "huono"
    ],
    feedback: "anna palautetta",
    statistics: "statistiikka"
  }
  
  return (
    <div>
      <Header header={sections.feedback} />
      <Button text={sections.buttonTexts[0]} handleClick={addGood} />
      <Button text={sections.buttonTexts[1]} handleClick={addNeutral} />
      <Button text={sections.buttonTexts[2]} handleClick={addBad} />
      <Header header={sections.statistics} />
      <Statistics
      buttonTexts={sections.buttonTexts}
      good={good}
      neutral={neutral}
      bad={bad}
      />
    </div>
  )
}

const Header = ({header}) => <><h1>{header}</h1></>

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

const Statistics = ({buttonTexts, good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text={buttonTexts[0]} value={good} />
        <Statistic text={buttonTexts[1]} value={neutral} />
        <Statistic text={buttonTexts[2]} value={bad} />
        <Statistic text="yhteensä" value={total} />
        <Statistic text="keskiarvo" value={(good-bad)/total} />
        <Statistic text="positiivista" value={good / total * 100} unit='%' />
      </tbody>
    </table>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)