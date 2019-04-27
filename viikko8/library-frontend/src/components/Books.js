import React, { useState } from 'react'

const Books = ({ result }) => {

  const [bookState, setBookState] = useState([])

  const allBooks = result.data.allBooks

  const books = bookState.length < 1 ? result.data.allBooks : bookState

  const uniqueFunction = (value, index, self) => self.indexOf(value) === index

  const booksWithGenres = allBooks.filter(b => b.genres.length !== 0)

  const genres = booksWithGenres
    .map(b => b.genres)
    .reduce((acc, curr) => acc.concat(curr), [])
    .filter(uniqueFunction)


  // niistä nappulat, joista voi filtteröidä resultin kirjat


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => {
            const author = a.author ? a.author : { name: '' }
            return (<tr key={a.title}>
              <td>{a.title}</td>
              <td>{author.name}</td>
              <td>{a.published}</td>
            </tr>)
          })}
        </tbody>
      </table>

      {genres.map(g => 
        <button onClick={() => {
          const newBooks = allBooks.filter(b => b.genres.includes(g))
          setBookState(newBooks)
        }}>{g}</button>)}

    </div>
  )
}

export default Books