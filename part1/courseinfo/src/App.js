const Header=(props)=>(
  <><h1>{props.coursename}</h1></>
)

const Part=(props)=>(
  <>
  <p>
    {props.part_name} {props.ex_count}
  </p>
  </>
)

const Content=(props)=>(
  <>
    <Part part_name={props.part1} ex_count={props.ex1}/>
    <Part part_name={props.part2} ex_count={props.ex2}/>
    <Part part_name={props.part3} ex_count={props.ex3}/>
  </>
)

const Total=(props)=>(
  <>
  <p>Number of Exercises {props.exercise_total}</p>
  </>
)
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header coursename={course}/>
      <Content part1={part1} part2={part1} part3={part1} ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
      <Total exercise_total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App