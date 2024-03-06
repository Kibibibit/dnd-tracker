import Stack from "../stack"


const Checkbox = ({ disabled = false, value, onChange = () => { }, label }) => {

    return <Stack direction="row">
        <div
            onClick={() => {
                if (!disabled) {
                    onChange(!value)
                }
            }}
            style={{
                borderColor: disabled ? "lightgray" : "gray",
                borderWidth: "4px",
                borderStyle: "solid",
                minHeight: "20px",
                maxHeight: "20px",
                minWidth: "20px",
                cursor: disabled ? "not-allowed" : "pointer",
                background: value ? "lightblue" : "transparent",
                borderRadius: "100%"
            }} />
        <div>{label}</div>
    </Stack>

}


export default Checkbox