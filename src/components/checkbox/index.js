import Stack from "../stack"


const Checkbox = ({value, onChange = () => {}, label}) => {

    return <Stack direction="row">
        <div 
        onClick={()=>onChange(!value)}
        style={{
            border:"solid grey 4px",
            height:"20px",
            width:"20px",
            cursor:"pointer",
            background: value ? "lightblue" : "transparent",
            borderRadius: "100%"
        }}/>
        <div>{label}</div>
    </Stack> 

}


export default Checkbox