const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://fullstack:pipapo@klusteri-t8jvp.mongodb.net/test?retryWrites=true'
console.log('connecting to,', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected!')
  })
  .catch((error) => {
    console.log('error connection to mongo:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    author: Author
    published: Int!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]
      allAuthors: [Author]
      Author: Int
      me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
  
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
  
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const query = {}
      if (args.genre) {
        query.genres = {
          $in: [args.genre]
        }
      }
      const juttu = await Book.find(query).populate('author')
      console.log(juttu)
      return juttu
    },

    bookCount: () => {
      return Book.collection.countDocuments()
    },
    authorCount: () => Author.collection.countDocuments(),

    allAuthors: async () => { 
      return await Author.find({})
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },

  Mutation: {
    addBook: async (root, args) => {

      let authorName = await Author.findOne({ name: args.author })
      if (authorName == null || authorName == undefined) {

        const newAuthor = new Author({
          name: args.author,
          bookCount: 1,
        })

        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        authorName = newAuthor
      }
      let newBook = new Book({
        title: args.title,
        athor: authorName,
        published: args.published,
        genres: args.genres

      })
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return newBook

    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author === null) {
        return null
      }

      const updatedAuthor = {
        name: author.name,
        born: args.setBornTo
      }
      const idok = author._id
      const result = await Author.findByIdAndUpdate(idok, updatedAuthor)
      const result2 = await Author.findById(idok)
      return result2
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})