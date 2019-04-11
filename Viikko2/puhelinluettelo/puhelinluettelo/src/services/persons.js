import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
};

const deletePerson = (id) => {
  const request = axios.delete(`/api/persons/${id}`)
  return request.then(response => response.data)
}

const update = (personObject) => {
  const request = axios.put(`${baseUrl}/${personObject.id}`, personObject)
  return request.then(response => response.data)
}

export default { getAll, create, deletePerson, update }