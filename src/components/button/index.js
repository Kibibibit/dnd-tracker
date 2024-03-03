
const Button = ({
    width="min-content",
    background="blue",
    disabledBackground="lightgray",
    textAlign="center",
    paddingInline="10px",
    paddingBlock="10px",
    fontSize="14pt",
    disabled=false,
    onClick=()=>{},
    children
}) => {

    return <div 
    onClick={(event)=>{
        if (!disabled) {
            onClick(event)
        }
    }}
    style={{
        paddingInline:paddingInline,
        paddingBlock:paddingBlock,
        background:disabled ? disabledBackground : background,
        color:"white",
        width:width,
        textAlign:textAlign,
        fontSize: fontSize,
        fontWeight: "bold",
        borderRadius: "10pt",
        cursor: disabled ? "not-allowed" : "pointer"
    }}>
        {children}
    </div>

}

export default Button