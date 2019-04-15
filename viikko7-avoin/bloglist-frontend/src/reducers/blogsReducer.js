import blogService from '.././services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INITIALIZE_BLOGS':
    return action.data
  case 'EDIT_BLOG':
    const index = state.findIndex(b => b.id === action.data.id)
    const uusiState = [...state]
    uusiState[index] = action.data
    return uusiState
  case 'DELETE_BLOG':
    return state.filter(s => s.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const editBlog = (data) => {
  return async dispatch => {
    const editedBlog = await blogService.update(data)
    dispatch({
      type: 'EDIT_BLOG',
      data: editedBlog
    })
  }
}

export const deleteBlog = (data) => {
  return async dispatch => {
    await blogService.remove(data)

    dispatch({
      type: 'DELETE_BLOG',
      data: data
    })
  }
}

export default blogsReducer