
const Notification=({message})=>{
    const style1={
        color:'green',
        fontSize:25,
        background:'lightgrey',
        border:'green solid 2px',
        borderRadius:'5px',
        padding:10,
        marginBottom:10
    }
    const style2={
        color:'red',
        fontSize:25,
        background:'lightgrey',
        border:'red solid 2px',
        borderRadius:'5px',
        padding:10,
        marginBottom:10
    }
    if(message===null){
        return null
    }
    else return(
        <div style={message.type?style1:style2}>
            <b>{message.text}</b>
        </div>
    )
}

export default Notification