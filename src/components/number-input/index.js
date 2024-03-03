

const NumberInput = ({value, onChange = ()=>{}}) => {

    return <input
        style={{
            fontSize:"14pt",
            padding: "10px"
        }}
        value={value} 
        onChange={(event)=>{onChange(event.target.value)}} 
        type="number"
    />

}


export default NumberInput