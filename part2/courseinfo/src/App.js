import Course from './components/Course'

const Header1=(props)=>(
  <><h1>{props.text}</h1></>
)

const Content=({head,courses})=>(
  <>
  <Header1 text={head}/>
  {courses.map((course)=><Course key={course.id} course={course}/>)}
  </>
)


const App = () => {
  const head="Web developement curriculum"
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      <Content head={head} courses={courses}/>
    </div>
  )
}

export default App