import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Edit from './components/Edit'

import { Query,  Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
   allAuthors {
    name,
    born,
    bookCount
   } 
}
`
const ALL_BOOKS = gql`
{
   allBooks {
    title,
    author,
    published
   } 
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published
  }
}
`
const EDIT_AUTHOR = gql`
mutation changeAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name,
    born
  }
}
`


const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>edit author</button>
      </div>

      <Query query={ALL_AUTHORS} >
        {(result) => {
          if (result.loading || page !== 'authors') {
            return (
              <div></div>
            )
          } else {
            return (
              <Authors result={result}
                show={page === 'authors'}
              />
            )
          }
        }}
      </Query>

      <Query query={ALL_BOOKS} >
        {(result) => {
          if (result.loading || page !== 'books') {
            return (
              <div></div>
            )
          } else {
            return (
              <Books result={result}
                show={page === 'books'}
              />
            )
          }
        }}
      </Query>


      <Mutation
        mutation={CREATE_BOOK}
        refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}>
        {(addBook) => {
          if (page !== 'add') {
            return (<div></div>)
          } else {
            return (
              <NewBook
                show={page === 'add'} addBook={addBook}
              />)
          }
        }}
      </Mutation>

      <Mutation
        mutation={EDIT_AUTHOR}
        refetchQueries={[{ query: ALL_AUTHORS }]}>
        {(editAuthor) => {
          if (page !== 'edit') {
            return (<div></div>)
          } else {
            return (
              <Edit
                show={page === 'edit'} editAuthor={editAuthor}
              />)}}}
      </Mutation>
    </div >

  )
}

export default App
