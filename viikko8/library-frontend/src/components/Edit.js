import React, { useState } from 'react'

const Edit = (props) => {

  const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')



  const submitNewYear = async (e) => {
    e.preventDefault()
    setSetBornTo(parseInt(setBornTo))


    await props.editAuthor({
      variables: { name, setBornTo }
    })

  }

  return (
    <div>
      <h2>Edit birth year</h2>
      <form onSubmit={submitNewYear}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          new year
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(parseInt(target.value))}
          />
        </div>
        <button type='submit'>edit year</button>
      </form>

    </div>
  )
}

export default Edit