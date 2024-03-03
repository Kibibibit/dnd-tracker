import { CLASS_LIST } from "../../constants/player-classes"
import { useStateContext } from "../../providers/state-provider"
import Button from "../button"
import Checkbox from "../checkbox"
import Modal from "../modal"
import ModalContent from "../modal-content"
import NumberInput from "../number-input"
import Stack from "../stack"


const ClassSelectModal = ({ isOpen, onClose }) => {

    const {
        playerClass, setPlayerClass,
        isHillDwarf, setIsHillDwarf,
        isTough, setIsTough,
        playerCon, setPlayerCon,
        setFirstLoad,
        isDraconicSorcerer, setIsDraconicSorcerer,
        setPlayerCurrentHp,
        maxHitPoints
    } = useStateContext()


    const canStart = playerCon > 0 && playerClass



    return <Modal isOpen={isOpen} onClose={onClose} closeOnClick={false}>
        <ModalContent width="80%">
            <h2>Welcome, please set up your character.</h2>
            <h3>Select your class:</h3>
            <Stack direction="row" wrap="wrap" justify="space-between">
                {CLASS_LIST.map((classType) => {
                    return <Button
                        key={`${classType}-button`}
                        width="20%"
                        paddingBlock="20px"
                        disabledBackground="green"
                        disabled={classType === playerClass}
                        background={classType === playerClass ? "green" : "gray"}
                        onClick={() => setPlayerClass(classType)}
                    >
                        {classType}
                    </Button>
                })}
            </Stack>
            <h3>Input your constitution:</h3>
            <Stack direction="row" justify="space-between">
                <NumberInput value={playerCon} onChange={setPlayerCon} />
                <Stack direction="row" justify="flex-end" width={"100%"}>
                    <Checkbox value={isTough} onChange={setIsTough} label={"Has the Tough feat?"} />
                    <Checkbox value={isHillDwarf} onChange={setIsHillDwarf} label={"Is a Hill Dwarf?"} />
                    <Checkbox value={isDraconicSorcerer} onChange={setIsDraconicSorcerer} label={"Is Draconic Sorcerer?"} />
                </Stack>

            </Stack>
            <Stack direction="row" padding="20px">
                <Button disabled={!canStart} fontSize="20pt" onClick={() => {
                    setFirstLoad(false)
                    setPlayerCurrentHp(maxHitPoints)
                    onClose()
                }}>Done</Button>
            </Stack>
        </ModalContent>
    </Modal>


}

export default ClassSelectModal