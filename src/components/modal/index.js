import { useRef } from "react"

const Modal = ({ isOpen, onClose = () => { }, closeOnClick = true, children }) => {

    const modalRef = useRef(null)

    const doClose = (event) => {
        if (event.target === modalRef.current && closeOnClick) {
            onClose()
        }
    }


    return <div
        onClick={doClose}
        ref={modalRef}
        style={{
            margin: 0,
            top:0,
            left:0,
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "#00000044",
            display: isOpen ? "block" : "none"
        }}>
        {children}
    </div>

}

export default Modal