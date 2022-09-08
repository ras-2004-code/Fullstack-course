import axios from 'axios'
import {useState,useEffect} from 'react'
import Search from './components/Search'

const Weather=({city})=>{
  const [weather,setWeather]=useState({})
  const api_key=process.env.REACT_APP_API_KEY
  useEffect(()=>{
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`).then((response)=>{
        setWeather(response.data)
      }).catch((error)=>{
        setWeather(error.response.data)
      })
    },[])
  if(weather.cod!=200){
    return(
      <div>
        <p>Cannot retrieve weather in {city}</p>
        <p>Error code {weather.cod}</p>
        <p>{weather.message}</p>
      </div>
    )
  }
  else if(weather.main)
  return(
    <div>
      <h2>Weather in {city}</h2>
      <p>{weather.weather[0].description}<br/>
      Temperature: {(weather.main.temp-273.15).toPrecision(5)} C</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
      <p>Wind speed: {weather.wind.speed} m/s<br/>
      {weather.wind.gust?`Gust: ${weather.wind.gust} m/s`:''}</p>
    </div>
  )
  else return<></>

}

const Country=({country})=>{

if(country.name){
  return(
    <div>
      <h1>{country.name.official}</h1>
      <p>
        {country.capital.length>1?'Capitals':'Capital'} :{country.capital.join(', ')}
        <br/>
        {country.independent?'Independent':'Dependent'} nation
        <br/>
        Area: {country.area}
        <br/>
        {country.name.official} is{country.landlocked?'':' not'} landlocked
      </p>
      <h3>Languages: </h3>
      <ul>
        {Object.entries(country.languages).map(([key,value])=><li key={key}>{value}</li>)}
      </ul>
      <h3>Currencies: </h3>
      <ul>
        {Object.entries(country.currencies).map(([key,currency])=><li key={key}>{currency.name} ({currency.symbol})</li>)}
      </ul>
      <img src={country.flags.png} style={{border:"5px solid black"}}/>
      <Weather city={country.capital[0]}/>
    </div>
  )
}
else return(<></>)
}

const Matches=({countries})=>{
  const [show,setShow]=useState(countries.map(()=>false))
  const [showCountry,setShowCountry]=useState({})

  const onClick=(event)=>{
    const newShow=show.map(()=>false)
    let newCountry={}
    const matchid=event.target.getAttribute('matchid')
    if(!show[matchid]){
      newShow[matchid]=true
      newCountry=countries[matchid]
    }
    setShow(newShow)
    setShowCountry(newCountry)
  }
  return(
    <div>
      {countries.map((country,index)=>(
      <div key={country.name.official}>
        {country.name.official}
        <button matchid={index} onClick={onClick}>{show[index]?'hide':'show'}</button>
      </div>
      ))}
      <Country country={showCountry}/>
    </div>
  )
}

const Display=({sKey,countries})=>{
  if(sKey==='')return(<div>Please enter a search filter.</div>)
  else{
    const matches=countries.filter((country)=>(country.name.official+country.name.common).search(new RegExp(sKey,'i'))>-1)
    if(matches.length>10)return(<div>Too many matches, please add further search filters.</div>)
    else{
      return(<div>
        <Matches countries={matches}/>
      </div>)
    }
  }
}

const App=()=>{
  const [countries,setCountries]=useState([])
  const [sKey,setKey]=useState("")

  useEffect(()=>{
    axios.get("https://restcountries.com/v3.1/all").then((response)=>{
      setCountries(response.data)
    })
  },[])

  return(
  <div>
    <Search sKey={sKey} setKey={setKey}/>
    <Display sKey={sKey} countries={countries}/>
  </div>
  )

}

export default App;
