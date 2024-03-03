import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Button from "../button"
import NumberInput from "../number-input"
import Stack from "../stack"

const HitPoints = () => {

    const { maxHitPoints, playerCurrentHp, setPlayerCurrentHp, playerTempHp, setPlayerTempHp } = useStateContext()

    const updatePlayerCurrentHp = (value) => {
        if (value < 0) {
            value = 0
        }
        if (value > maxHitPoints) {
            value = maxHitPoints
        }
        setPlayerCurrentHp(value)
    }

    const updatePlayerTempHp = (value) => {
        if (value < 0) {
            value = 0
        }
        setPlayerTempHp(value)
    }


    const modifyButton = (amount, getter, setter) => <Button
        onClick={() => setter(getter + amount)}
        width="40px"
        paddingBlock="15px"
    >
        {amount >= 0 ? "+" : ""}{amount}
    </Button>


    const valueBox = (getter, setter, max) => <>
        <div style={{ marginBlock: "20px" }}>
            <Stack direction="row" justify="center" width={"100%"}>
            <NumberInput value={getter} onChange={setter} />
            </Stack>
           
        </div>
        <div><Stack direction="row" justify="space-between">
            <Stack direction="row" justify="center">
                {modifyButton(-10, getter, setter)}
                {modifyButton(-5, getter, setter)}
                {modifyButton(-1, getter, setter)}
            </Stack>
            <div style={{ marginInline: "10px" }}>
                {max > 0 &&
                    <Button paddingBlock="15px" width="50px" onClick={() => setter(max)} >Max</Button>}
            </div>

            <Stack direction="row" justify="center">
                {modifyButton(1, getter, setter)}
                {modifyButton(5, getter, setter)}
                {modifyButton(10, getter, setter)}
            </Stack>
        </Stack></div>
    </>

    return <BodySection title="Hit Points"

        modalContent={<div>
            <div style={{ textAlign: "center", margin: "10px" }}>Maximum HP: {maxHitPoints}</div>
            {valueBox(playerCurrentHp, updatePlayerCurrentHp, maxHitPoints)}

            
            <div style={{ textAlign: "center", marginTop: "30px" }}>Temporary Hit Points</div>
            {valueBox(playerTempHp, updatePlayerTempHp,0)}
        </div>}

    >
        <div style={{ textAlign: "center" }}>{playerCurrentHp}/{maxHitPoints}</div>
        <div style={{ textAlign: "center" }}>+{playerTempHp} (temporary)</div>
    </BodySection>

}

export default HitPoints