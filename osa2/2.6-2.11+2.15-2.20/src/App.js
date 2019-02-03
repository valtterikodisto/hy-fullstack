import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const Notification = ({message}) => {
  if (message === null) return null
  
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({errorMessage}) => {
  if (errorMessage === null) return null
  
  return (
    <div className="notification error-notification">
      {errorMessage}
    </div>
  )
}

const RemoveButton = ({person, removePerson}) => {
  return (
    <button onClick={() => removePerson(person)}>remove</button>
  )
}

const Person = ({person, removePerson}) => <p>{person.name} {person.number} <RemoveButton person={person} removePerson={removePerson} /></p>

const Persons = ({persons, newFilter, removePerson}) => {
  const filteredPersons = !newFilter ? persons : persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))
  return filteredPersons.map(person => <Person key={person.name} person={person} removePerson={removePerson} />);
}

const Filter = ({value, handler}) => <div>rajaa näytettäviä: <input value={value} onChange={handler} /></div>

const PersonsForm = ({personValue, personHandler, numberValue, numberHandler, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <div>nimi: <input value={personValue} onChange={personHandler} /></div>
        <div>numero: <input value={numberValue} onChange={numberHandler} /></div>
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name.toLowerCase())

    if (!names.includes(newName.toLowerCase())) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          flashNotification(`Lisättiin ${returnedPerson.name}`)
        })

    } else {
      const personOnList = persons.find(p => p.name.toLowerCase() === newName.toLocaleLowerCase())
      if (window.confirm(`${personOnList.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changedPerson = {...personOnList, number: newNumber}
        personService
          .update(personOnList.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== personOnList.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
            flashNotification(`Päivitettiin ${changedPerson.name}`)
          })
      }
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}`)){
      personService
        .remove(person.id)
        .then(() => {
          flashNotification(`Poistettiin ${person.name}`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          flashError(`Henkilö ${person.name} oli jo poistettu`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const flashNotification = (notification) => {
    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const flashError = (error) => {
    setErrorMessage(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={message} />
      <Error errorMessage={errorMessage} />
      <Filter value={newFilter} handler={handleFilterChange} />
      
      <h2>Lisää uusi</h2>
      <PersonsForm 
      personValue={newName} 
      personHandler={handlePersonChange} 
      numberValue={newNumber}
      numberHandler={handleNumberChange}
      addPerson={addPerson}/>

      <h2>Numerot</h2>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )

}

export default App