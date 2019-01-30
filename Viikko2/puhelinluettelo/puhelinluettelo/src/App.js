import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import AddForm from './components/Form'
import LookForm from './components/LookForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newLookFor, setNewLookFor] = useState('')
  const [messageToUser, setMessageToUser] = useState({text: null})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const Notification = (props) => {
    if (props.message.text === null) {
      return null
    } else {
      return (
        <div className={props.message.style}> 
          {props.message.text}
        </div>
      )
    }
  }

  const personsToShow = () => {
    return persons.filter(person => {
      if (newLookFor.length) {
        return person.name.toLowerCase().includes(newLookFor.toLowerCase())
      }
      return true
    })
  }

  const rows = () => personsToShow().map(name =>
    <Name
      key={name.id}
      name={name}
      number={name.number}
      deletePerson={deletePerson}
    />
  )

  const deletePerson = (props) => {
    if (window.confirm(`Olet poistamassa ${props.name}`)) {
    personService
      .deletePerson(props.id).then(()=>{
        setPersons(persons.filter((person => person.id !== props.id )))

      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
     // id: persons.length + 1 + Math.floor(Math.random()*100000),
      id: persons.length ? [...persons].sort((a, b) => b.id - a.id)[0].id + 1 : 1,
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
    }

    let ok = true

    persons.forEach(function (person) {
      if (newName === person.name) {
        ok = false
      }
    });

    if (ok === true) {

      setMessageToUser(
        {text: `Henkilö ${newName} lisätty luetteloon`,
        style: 'success'}
      )
      setTimeout(() => {
        setMessageToUser({text: null})
      }, 5000)

      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })

    } else {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(changedPerson).then(returnedPerson => {
          setPersons(persons.map(tyyppi => tyyppi.id !== person.id ? tyyppi : returnedPerson))
        })
        .catch(error => {

          setMessageToUser(
            {text: `Yhteystieto ${changedPerson.name} on jo valitettavasti poistettu`, 
          style: 'fail'}
          )  
          setTimeout(() => {
            setMessageToUser({text:null})
          }, 5000)

          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleLookForChange = (event) => {
    setNewLookFor(event.target.value)
  }

  return (
    <div>
      <h2>Etsi nimellä</h2>
      <LookForm
        newLookFor={newLookFor}
        handleLookForChange={handleLookForChange}
      />
      <h2>Puhelinluettelo</h2>
      <Notification message={messageToUser} />
      <AddForm
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