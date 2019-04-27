import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Edit from './components/Edit'
import Login from './components/Login'
import RecommendBooks from './components/Recommend'

import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useApolloClient, useMutation, useQuery } from 'react-apollo-hooks'

import { Subscription } from 'react-apollo'

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title,
    author { name },
    published
    genres
  }
}
`

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
    author { name },
    published
    genres
   } 
}
`


const ME = gql`
  {
    me {
      username,
      favouriteGenre
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
    author {name},
    published
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value,
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
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token', token))
  }, [])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const loginComponent = () => {
    return (
      <div>
        <button onClick={() => setPage('login')}>login</button>
      </div>
    )
  }

  const logoutComponent = () => {
    return (
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('edit')}>edit author</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
      </div>
    )
  }

  const newBookComponent = () => {
    return (
      <NewBook addBook={addBook} />
    )
  }


  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>


  const addBook = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {

      const dataInStore = store.readQuery({ query: ALL_BOOKS })

      dataInStore.allBooks.push(response.data.addBook)


      store.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      })

      const dataInStore2 = store.readQuery({ query: ALL_AUTHORS })
      dataInStore2.allAuthors.push(response.data.addBook)

      store.writeQuery({
        query: ALL_AUTHORS,
        data: dataInStore2
      })
    }
  })

  return (
    <div>
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({subscriptionData}) => {
          alert("New book added please reload!")
        }}
      > 
        {() => null}
      </Subscription>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token === null && loginComponent()}
        {token !== null && logoutComponent()}
        

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
        mutation={EDIT_AUTHOR}
        refetchQueries={[{ query: ALL_AUTHORS }]}>
        {(editAuthor) => {
          if (page !== 'edit') {
            return (<div></div>)
          } else {
            return (
              <Edit
                show={page === 'edit'} editAuthor={editAuthor}
              />
            )
          }
        }}
      </Mutation>

      <Mutation
        mutation={LOGIN}>
        {(login) => {
          if (page !== 'login') {
            return (<div></div>)
          } else {
            return (
              <div>
                {errorNotification()}
                <h2>Login</h2>
                <Login login={login} setToken={(token) => setToken(token)}
                  handleError={handleError} />
              </div>
            )
          }
        }}
      </Mutation>

      {page === 'add' && newBookComponent()}

      <Query query={ME} >
        {(result) => {
          if (result.loading || page !== 'recommendations') {
            return (
              <div></div>
            )
          } else {

            return (
              <div>
                <Query query={ALL_BOOKS} >
                   {(result2) => {
                     if (result2.loading) {
                       return (
                         <div></div>
                       )
                     } else {
                       return (
                         <div>
                           <RecommendBooks token={token} result={result} result2={result2}/>
                         </div>
                       )
                     }
                   }}
                </Query>
              </div>
            )
          }
        }}
      </Query>
    </div >
  )
}

export default App
