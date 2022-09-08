import Numbers from './components/Numbers'
import Notification from './components/Notification'
import numServices from './services/numbers'

import {useState ,useEffect} from 'react'

const Form=({newPerson,onChangePerson,onSubmit})=>(
  <>
  <h2>Add a new</h2>
  <form onSubmit={onSubmit}>
    <div>
      name: <input id='name' placeholder='Enter Name' value={newPerson.name} onChange={onChangePerson}/>
    </div>
    <div>
      number: <input id='number' placeholder='Enter Number' value={newPerson.number} onChange={onChangePerson}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  </>
)
const Search=({search,onChangeSearch})=>(
  <div>
    <input placeholder='Search key' value={search} onChange={onChangeSearch}/>
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [message,setMessage]=useState(null)
  const [lastTimeout,setLastTimeout]=useState(null)

  useEffect(()=>{
    numServices.getAll().then((personsData)=>{
      setPersons(personsData)
    })
  },[])
  
  const [search,setSearch] = useState('')
  
  const [newPerson, setNewPerson] = useState({name:'',number:''})

  const onSubmit=(event)=>{
    event.preventDefault()

    if(newPerson.name==='' || newPerson.number===''){
      if(lastTimeout)clearTimeout(lastTimeout)
      setMessage({text:'Name and number are both mandatory fields',type:false})
      setLastTimeout(setTimeout(()=>setMessage(null),5000))
    }else numServices.getAll().then((personData)=>{
      if(personData.find(p=>{
        const check=p.name.toLowerCase()===newPerson.name.toLowerCase()
        if(check){
          if(window.confirm(`${p.name} is already added to the phone book. Would you like to update their number?`)){
            numServices.update(p.id,newPerson)
            p.name=newPerson.name
            p.number=newPerson.number
            if(lastTimeout)clearTimeout(lastTimeout)
            setMessage({text:`Data for ${newPerson.name} was updated`,type:true})
            setLastTimeout(setTimeout(()=>setMessage(null),5000))
            setPersons(personData)
            setNewPerson({name:'',number:''})
          }
        }
        return check
      })){}
      else
      numServices.create(newPerson).then((newPersonData)=>{
        if(lastTimeout)clearTimeout(lastTimeout)
        setMessage({text:`${newPerson.name} was added to the phonebook`,type:true})
        setLastTimeout(setTimeout(()=>setMessage(null),5000))
        setPersons(personData.concat(newPersonData))
        setNewPerson({name:'',number:''})
      })
    })
  }
  const onChangePerson=(event)=>{
    const addPerson={...newPerson}
    if(event.target.id==='name')
    addPerson.name=event.target.value
    else if(event.target.id==='number')
    addPerson.number=event.target.value
    setNewPerson(addPerson)
  }

  const onChangeSearch=(event)=>{
    setSearch(event.target.value)
  }

  const deletePerson=(person)=>{
    let id=person.id
    if(window.confirm(`Delete ${person.name}?`)){
      numServices.del(person.id).catch((err)=>{
        if(err.response.status===404){
          if(lastTimeout)clearTimeout(lastTimeout)
          setMessage({text:`${person.name} was already deleted.`,type:false})
          setTimeout(()=>setMessage(null),5000)
        }
        else{
          if(lastTimeout)clearTimeout(lastTimeout)
          setMessage({text:`There was some error while deleting ${person.name}. Please reload and try again.`,type:false})
          setLastTimeout(setTimeout(()=>setMessage(null),5000))
        }
      })
      if(lastTimeout)clearTimeout(lastTimeout)
      setMessage({text:`Deleted information of ${person.name}`,type:true})
      setLastTimeout(setTimeout(()=>setMessage(null),5000))
      setPersons(persons.filter(p=>p.id!==id))
    }
  }


  let matchList=[]
  if(search){
    const searchList=search.split(' ').filter(k=>k!='')
    matchList=persons.filter((person)=>searchList.some(k=>new RegExp(k,'i').test(person.name)))
  }
  else matchList=persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Search search={search} onChangeSearch={onChangeSearch}/>
      <Form newPerson={newPerson} onChangePerson={onChangePerson} onSubmit={onSubmit}/>
      <Numbers persons={matchList} deletePerson={deletePerson}/>
    </div>
  )
}

export default App