import React from 'react'
import 'jest-dom/extend-expect'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

test('renders content', () => {

  const uuseri = {
    username: 'olga'
  }
  const ploki = {
    title: 'testiblogi',
    author: 'testiauthor',
    url: 'www.pipapo.fi',
    likes: 6,
    user: uuseri

  }

  const component = render(
    <Blog blog={ploki} user={uuseri} />
  )

  expect(component.container).toHaveTextContent(
    'testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'testiauthor'
  )
})

it('clicking the button shows url and likes', async () => {

  const uuseri = {
    username: 'olga'
  }
  const ploki = {
    title: 'testiblogi',
    author: 'testiauthor',
    likes: 6,
    url: 'www.pipapo.fi',
    user: uuseri
  }

  const component = render(
    <Blog blog={ploki} user={uuseri} />
  )

  const { getByText } = render(
    <Blog blog={ploki} user={uuseri} />
  )

  const div = getByText('testiblogi')
  fireEvent.click(div)

  expect(component.container).toHaveTextContent(
    'testiblogi'
  )

  expect(component.container).toHaveTextContent(
    'testiauthor'
  )

  expect(component.container).toHaveTextContent(
    'www.pipapo.fi'
  )

  expect(component.container).toHaveTextContent(
    '6'
  )

})
