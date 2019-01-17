import React from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old 
      </p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/olgaviho"> olgaviho</a>
    </div>  
  )
}

const App = () => {
  const nimi = 'Olga'
  const ika = '23'

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={nimi} age={ika}/> 
      <Hello name= 'Leo' age={23+1}/>
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
