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
    bookCount: Int!
  }

  type Book {
    title: String!
    author: String!
    published: Int!
    id: ID!
    genres: [String!]
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]
      allAuthors: [Author!]!
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
  }
  
`

const resolvers = {

  // allaolevia pitää korjata:
  Query: {
    allBooks: async (root, args) => { // toimii ilman parametreja pitää saada genre mukaan, pientä hiomista, toimiiko kenttä author jos pyytää sen näkyville?
      const booksit = await Book.find({})
      const vaatimukset = args.genre

      if (vaatimukset === undefined) {
        return booksit
      }

      console.log('vaatimukset', vaatimukset)
      const filterbooksit = booksit.filter((b) => {
        console.log('bn ganret', b.genres)
        b.genres.includes(vaatimukset)
      })

      return filterbooksit
    },

    bookCount: () => Book.collection.countDocuments(), // toimii ilman parametreja
    authorCount: () => Author.collection.countDocuments(), // toimii
    allAuthors: () => {  // pitää saada toimimaan kirjojen lukumaaralla?
      return Author.find({})
    }
  },

  // mutaatiot toimivat
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