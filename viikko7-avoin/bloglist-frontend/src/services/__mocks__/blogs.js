const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Olgan blogi',
    author: 'Olga',
    url: 'www.pipapo.fi',
    likes: 7,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Olga',
      name: 'Olga Viholainen'
    }
  },
  {
    id: '5a451df7571c224a3353456236',
    title: 'Leon blogi',
    author: 'Olga',
    url: 'www.pipapo.fi',
    likes: 7,
    user: {
      _id: '5a437a9e5154747f168ddf138',
      username: 'Olga',
      name: 'Olga Viholainen'
    }
  },

]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }