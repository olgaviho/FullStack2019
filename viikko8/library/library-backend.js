const { ApolloServer, gql, UserInputError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const pubsub = new PubSub()

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

  type Subscription {
    bookAdded: Book!
  }
  type User {
    username: String!
    favouriteGenre: String
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
      return juttu
    },

    bookCount: () => {
      return Book.collection.countDocuments()
    },
    me: (root, args, context) => {
      console.log('MEEEEEEE', context.currentUser)
      return context.currentUser
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
    addBook: async (root, args, context) => {


      const currentUser = context.currentUser
      console.log('current user', currentUser)

      if (!currentUser) {
        console.log('not authenticated')
        return null
      }

      let authorName = await Author.findOne({ name: args.author })
      if (authorName == null || authorName == undefined) {



        const newAuthor = new Author({
          name: args.author,
          born: 0,
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
        author: authorName,
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

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook

    },
    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser
      console.log('current user', currentUser)

      if (!currentUser) {
        console.log('authentication error')
        return null
      }


      const author = await Author.findOne({ name: args.name })
      if (author === null) {
        return null
      }

      const updatedAuthor = {
        name: author.name,
        born: args.setBornTo
      }
      const idok = author._id
      try {
        await Author.findByIdAndUpdate(idok, updatedAuthor)
        const result2 = await Author.findById(idok)
        return result2
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})