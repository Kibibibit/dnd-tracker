

const ModalContent = ({ width, children }) => {
    return <div style={{
        position: "absolute",
        background: "white",
        color: "black",
        top: "50%",
        left: "50%",
        width: width,
        transform: "translateY(-50%) translateX(-50%)",
        border: "solid gray 1px",
        borderRadius: "10px",
        padding: "20px"
    }}>
        <div style={{
            position: "relative"
        }}>
            {children}
        </div>

    </div>
}

export default ModalContent