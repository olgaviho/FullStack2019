import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
  const request = axios.get(baseUrl)
  const ret = request.then(response => response.data)
  return ret
}

export default { getAll }