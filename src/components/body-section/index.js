import { useState } from "react"
import Modal from "../modal"
import ModalContent from "../modal-content"
import Stack from "../stack"
import Button from "../button"


const BodySection = ({ title, children, modalContent, width="100%", modalWidth, onDone = () => {} }) => {

    const [modalOpen, setModalOpen] = useState(false)

    return <>
        <Modal isOpen={modalOpen} closeOnClick={true} onClose={() => setModalOpen(false)}>
            <ModalContent width={modalWidth}>
                <div style={{
                    width: "100%",
                    fontSize: "20pt",
                    fontWeight: "bold",
                    textAlign:"center"
                }}>
                    {title}
                </div>
                {modalContent}
                <Stack width={"100%"} direction="row" justify="center">
                    <Button onClick={()=>{
                        setModalOpen(false)
                        onDone()
                    }}>
                        Done
                    </Button>
                </Stack>

            </ModalContent>
        </Modal>
        <div
            onClick={() => {
                setModalOpen(true)
            }}
            style={{
                width: width,
                background: "lightblue",
                borderWidth: "4px",
                borderStyle: "solid",
                borderTopColor: "rgba(255,255,255,40%)",
                borderLeftColor: "rgba(255,255,255,40%)",
                borderBottomColor: "rgba(0,0,0,20%)",
                borderRightColor: "rgba(0,0,0,20%)",
                borderRadius: "10px",
                padding: "10px",
                cursor: "pointer"
            }}>

            <Stack align="center">
                <div style={{ fontSize: "20pt", fontWeight: "bold" }}>{title}</div>
                <div>{children}</div>
            </Stack></div>
    </>
}

export default BodySection