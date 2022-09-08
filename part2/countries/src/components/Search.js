

const Search=({sKey,setKey})=>{

    const onChange=(event)=>{
        setKey(event.target.value)
    }

    return(
        <div>
            find country <input placeholder='search' value={sKey} onChange={onChange}/>
        </div>
    )
}

export default Search