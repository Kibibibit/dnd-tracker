

const NumberInput = ({value, onChange = ()=>{}, width}) => {

    return <input
        style={{
            fontSize:"14pt",
            padding: "10px",
            width: width
        }}
        value={value} 
        onChange={(event)=>{onChange(event.target.value)}} 
        type="number"
    />

}


export default NumberInput