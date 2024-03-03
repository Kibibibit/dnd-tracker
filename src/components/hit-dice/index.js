import { getClassHitDice } from "../../constants/player-classes"
import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Stack from "../stack"
import NumberInput from "../number-input"
import Button from "../button"

const HitDice = () => {

    const { playerClass, playerLevel, playerHitDice, setPlayerHitDice } = useStateContext()
    const hitDice = getClassHitDice(playerClass)


    const updatePlayerHitDice = (value) => {
        if (value > playerLevel) {
            value = playerLevel
        }
        if (value < 0) {
            value = 0
        }
        setPlayerHitDice(value)
    }

    return <BodySection title="Hit Dice" modalContent={<Stack>

        <div style={{ textAlign: "center", margin: "10px" }}>Hit Dice Type: d{hitDice}</div>

        <div style={{ marginBottom: "20px" }}>
            <NumberInput onChange={updatePlayerHitDice} value={playerHitDice} />
        </div>

        <div style={{marginBottom:"30px"}}>
            <Stack direction="row" justify="space-between">
                <Stack direction="row">
                    <Button 
                        paddingBlock="20px" 
                        width="50px"
                        onClick={()=>updatePlayerHitDice(playerHitDice-1)}
                    >-1</Button>
                    <Button 
                        paddingBlock="20px" 
                        width="50px"
                        onClick={()=>updatePlayerHitDice(playerHitDice+1)}
                    >+1</Button>
                </Stack>

                <Button 
                    paddingBlock="20px" 
                    width="50px"
                    onClick={()=>updatePlayerHitDice(playerLevel)}
                >Max</Button>
            </Stack>
        </div>

    </Stack>}>
        <div>{playerHitDice}/{playerLevel}d{hitDice}</div>
    </BodySection>


}

export default HitDice