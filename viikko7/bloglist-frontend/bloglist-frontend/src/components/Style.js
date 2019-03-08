import styled from 'styled-components'

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
  background: palevioletred;
  color: white;
`
const OtherButton = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
  background: white;
  color: palevioletred;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: powderblue;
`
const Navigation = styled.div`
  background: turquoise;
  padding: 1em;
`
const Pad = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: Pink;
`
const Notif = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid MediumSpringGreen ;
  border-radius: 3px;
  background: LightYellow;
`


export { Button, Input, OtherButton, Page, Navigation, Pad, Notif }