

const Stack = ({
    direction="column", 
    wrap="nowrap", 
    justify="flex-start",
    align,
    padding="0px",
    width,
    gap="5px",
    children,
   
}) => {

    return <div style={{
        display:"flex",
        flexWrap:wrap,
        width:width,
        justifyContent:justify,
        alignItems: align,
        flexDirection:direction,
        padding:padding,
        gap: gap,
    }}>
        {children}
    </div>


}

export default Stack