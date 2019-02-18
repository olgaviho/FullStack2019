import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


test('renders content', () => {
  const simpleBlog = {
    title: 'testiblogi',
    author: 'testiauthor',
    likes: 6
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  expect(component.container).toHaveTextContent(
    'testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'testiauthor'
  )

  expect(component.container).toHaveTextContent(
    'blog has 6 likes'
  )
})

it('clicking the button twice calls event handler twice', async () => {
  const simpleBlog = {
    title: 'testiblogi',
    author: 'testiauthor',
    likes: 6
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)

  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
