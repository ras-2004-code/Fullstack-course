const Person=({person,deletePerson})=>(
<div>
    {person.name} {person.number}{' '}
    <button onClick={()=>deletePerson(person)}>delete</button>
    <br/>
</div>
)

const Numbers=({persons,deletePerson})=>(
<>
<h2>Numbers</h2>
{persons.map((person)=><Person key={person.id} person={person} deletePerson={deletePerson}/>)}
</>
)

export default Numbers