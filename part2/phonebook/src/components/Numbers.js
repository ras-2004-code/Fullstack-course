const Person=({person})=>(
<div>
    {person.name} {person.number}
    <br/>
</div>
)

const Numbers=({persons})=>(
<>
<h2>Numbers</h2>
{persons.map((person)=><Person key={person.name} person={person}/>)}
</>
)

export default Numbers