import {useState} from 'react'

const Heading=({text})=>(<h1>{text}</h1>)

const Button=({onClick,text})=><button onClick={onClick}>{text}</button>

const Anecdote=({anecdote})=>(
  <>
    <p>{anecdote.text}</p>
    <p>has {anecdote.vote} votes</p>
  </>
)

const AnecDay=({head,anecdotes,onVote,onRand})=>(
  <>
    <Heading text={head}/>
    <Anecdote anecdote={anecdotes[0]}/>
    <Button onClick={onVote} text='vote'/>
    <Button onClick={onRand} text='next anecdote'/>
  </>
)

const AnecMax=({head,anecdotes})=>(
  <>
    <Heading text={head}/>
    <Anecdote anecdote={anecdotes[1]}/>
  </>
)

const App = () => {
  const a = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const b=[]
  b.push({index:0,text:a[0],vote:0})
  b.push({index:0,text:a[0],vote:0})
  for(const anec in a){
    b.push({text:a[anec],vote:0})
  }
  const [anecdotes,setAnec]=useState(b)

  const voteClick=()=>{
    const newAnec=[...anecdotes]
    newAnec[0].vote++
    newAnec[newAnec[0].index+2].vote++
    if(newAnec[0].vote>newAnec[1].vote){
      newAnec[1]=newAnec[0]
    }
    setAnec(newAnec)
  }

  const randClick=()=>{
    let newIndex=Math.floor(Math.random()*6)
    if(newIndex>=anecdotes[0].index)newIndex++;
    const newAnec=[...anecdotes]
    newAnec[0]={index:newIndex,...anecdotes[newIndex+2]}
    setAnec(newAnec)
  }

  const h1='Anecdote of the day',h2='Anecdote with most votes'

  return (
    <div>
      <AnecDay head={h1} anecdotes={anecdotes} onVote={voteClick} onRand={randClick}/>
      <AnecMax head={h2} anecdotes={anecdotes}/>
    </div>
  )
}
export default App;
