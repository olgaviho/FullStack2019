import React from 'react'


const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
  const Total = (props) => {
      console.log(props.parts)
  //    const reducer = (accumulator, currentValue) => accumulator + currentValue;
  //    const points = props.parts.ex.reduce(reducer)
  //    console.log(points)
      return (
        <div>
          yhteensä 0 opintopistettä
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
  
  const Course = (props) => {
  
    // miten saada yhdella mappauksella kutsuttua useita asioita? Muuten menee järjestys vääräksi...
  
    return (
      <div>
        {props.courses.map(course => <Header
          key={course.name}
          course={course}
        />
        )}
        {props.courses.map(course => <Content
          key={course.name}
          parts={course.parts}
        />)}
        {props.courses.map(course => <Total
          key={course.name}
          parts={course.parts}
        />)}
      </div>
    )
  }

export default Course