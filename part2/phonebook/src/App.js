import Numbers from './components/Numbers'
import { useState } from 'react'


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
  <>
  <h2>Phonebook</h2>
  <div>
    <input placeholder='Search key' value={search} onChange={onChangeSearch}/>
  </div>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  
  const [search,setSearch] = useState('')
  
  const [newPerson, setNewPerson] = useState({name:'',number:''})

  const onSubmit=(event)=>{
    event.preventDefault()
    if(newPerson.name==='' || newPerson.number===''){
      window.alert('Name and number are both mandatory fields')
    }
    else if(persons.find((person)=>person.name===newPerson.name)){
      window.alert(`${newPerson.name} is already added to phonebook`)
    }
    else if(persons.find((person)=>person.number===newPerson.number)){
      window.alert(`Two people cannot have the same number`)
    }
    else{
      setPersons(persons.concat(newPerson))
      setNewPerson({name:'',number:''})
    }
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
  let searchList=''
  if(search){
    searchList=persons.filter((person)=>person.name.search(new RegExp(search,'i'))>-1)
  }
  else searchList=persons
  return (
    <div>
      <Search search={search} onChangeSearch={onChangeSearch}/>
      <Form newPerson={newPerson} onChangePerson={onChangePerson} onSubmit={onSubmit}/>
      <Numbers persons={searchList}/>
    </div>
  )
}

export default App