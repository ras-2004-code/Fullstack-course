import React from 'react'


const Header2=(props)=>(
    <><h2>{props.text}</h2></>
)

  
const Parts=(props)=>(
    <>
      {props.parts.map((part)=><Part key={part.id} part={part}/>)}
      <Total parts={props.parts}/>
    </>
)
const Part=(props)=>(
    <>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
    </>
)
  
  
const Total=(props)=>(
    <>
    <p><b>Total of {props.parts.reduce((sum,part)=>sum+part.exercises,0)} exercises</b></p>
    </>
)

const Course=({course})=>(
    <>
    <Header2 text={course.name}/>
    <Parts parts={course.parts}/>
    </>
)

export default Course

