import React from 'react'


const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Total = (props) => {
  const points = props.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

  return (
    <div>
      <p>
      yhteensä {points} opintopistettä
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.ex}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <ul>
        {props.parts.map(part => <Part
          key={part.name}
          name={part.name}
          ex={part.ex}
        />)}
      </ul>
    </div>
  )
}
const CallFunctions = (props) => {
  return (
    <div>
      <Header
        key={props.course.name}
        course={props.course}
      />
      <Content
        parts={props.course.parts}
      />
      <Total
        parts={props.course.parts}
      />
    </div>
  )
}


const Course = (props) => {

  return (
    <div>
      {props.courses.map(course => <CallFunctions
        key={course.name}
        course={course}
      />
      )}
    </div>
  )
}

export default Course