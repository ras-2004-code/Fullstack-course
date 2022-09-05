import {useState} from 'react'

const Heading=({text})=><h1>{text}</h1>

const Button=({onClick,text})=><button onClick={onClick}>{text}</button>

const StatLine=({name,value})=><tr><td>{name}</td><td>{value+(name==='positive'?" %":"")}</td></tr>

const Stats=({stats})=>{
  stats.all=stats.good+stats.bad+stats.neutral;
  stats.average=(stats.good-stats.bad)/stats.all
  stats.positive=(stats.good)*100/stats.all
  if(stats.good>0 || stats.neutral>0 || stats.bad>0){
    // let comp=""
    // for(const stat in stats){
    //   comp+=`<p>${stat} ${stats[stat]}</p>\n`
    // }
    // return <div dangerouslySetInnerHTML={{__html: comp}}/>
    return(
      <table>
        <tbody>
        <StatLine name='good' value={stats.good}/>
        <StatLine name='neutral' value={stats.neutral}/>
        <StatLine name='bad' value={stats.bad}/>
        <StatLine name='all' value={stats.all}/>
        <StatLine name='average' value={stats.average}/>
        <StatLine name='positive' value={stats.positive}/>
        </tbody>
      </table>
    )
  }
  return(
    <p>No feedback given</p>
  )
}

const Display=(props)=>{
  return(
    <>
      <Heading text={props.h1}/>
      <Button onClick={props.click('good')} text='good'/>
      <Button onClick={props.click('neutral')} text='neutral'/>
      <Button onClick={props.click('bad')} text='bad'/>
      <Heading text={props.h2}/>
      <Stats stats={props.stats}/>
    </>
  )
}

const App=()=>{
  const [stats,changeStats]=useState({good:0,neutral:0,bad:0});
  const handleClick=(type)=>()=>{
    const newStats={...stats}
    newStats[type]++
    changeStats(newStats)
  }
  const head1="give feedback",head2="statistics"

  return(
    <div>
      <Display h1={head1} h2={head2} click={handleClick} stats={stats}/>
    </div>
  )
}

export default App;
