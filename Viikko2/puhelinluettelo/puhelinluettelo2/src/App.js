import React, { useState } from 'react'
import Name from './components/Name'
import Form from './components/Form'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('uusi nimi')
  const [newNumber, setNewNumber] = useState('uusi puhelinnumero')

  const rows = () => persons.map(name =>
    <Name
      key={name.id}
      name={name}
      number={name.puh}
    />
  )

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: persons.length + 1,
      wholename: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    let ok = true

    persons.forEach(function (person) {
      console.log(newName)
      if (newName === person.wholename) {
        ok = false
      }
    });

    if (ok === true) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} on jo luettelossa`);
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Form
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App