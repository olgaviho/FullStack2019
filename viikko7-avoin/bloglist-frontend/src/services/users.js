import axios from 'axios'
const baseurl = 'api/users'

const getAll = async () => {
  const response = await axios.get(baseurl)
  return response.data
}

export default {
  getAll
}