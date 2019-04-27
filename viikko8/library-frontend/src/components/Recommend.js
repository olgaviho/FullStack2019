import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const RecommendBooks = (props) => {

  const ME = gql`
  {
    me {
      username,
      favouriteGenre
    }
  }
`
  const result = useQuery(ME)
  console.log(result)
  if (!result.data.me) {
    return <div>Please load page!</div>
  }
  console.log("token", props.token)
  console.log('result', result)
  if (!result.data.me.favouriteGenre) {
    return <div>You don't have favorite genre! Go back :(</div>
  }

  const filterBooks = props.result2.data.allBooks.filter(b => b.genres.includes(props.result.data.me.favouriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre: 

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
          {filterBooks.map(a => {
            const author = a.author ? a.author : { name: '' }
            return (<tr key={a.title}>
              <td>{a.title}</td>
              <td>{author.name}</td>
              <td>{a.published}</td>
            </tr>)
          })}
        </tbody>
      </table>


    </div>
  )
}

export default RecommendBooks