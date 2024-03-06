import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Stack from "../stack"
import NumberInput from "../number-input"
import Button from "../button"

const HitDice = () => {

    const {  playerHitDice, setPlayerHitDice, maxDicePool } = useStateContext()

    const updatePlayerHitDice = (value, diceType) => {
        if (value > maxDicePool[diceType]) {
            value = maxDicePool[diceType]
        }
        if (value < 0) {
            value = 0
        }
        setPlayerHitDice({ ...playerHitDice, [diceType]: value })
    }

    return <BodySection title="Hit Dice" modalWidth={"80%"} modalContent={<Stack>
        <Stack direction="row" wrap="wrap" justify="center" gap="40px">

        
        {Object.keys(maxDicePool).map((hitDiceType) => {

            const hitDiceAmount = playerHitDice[hitDiceType] ?? 0

            return <div key={`hit-dice-content-d${hitDiceType}`}>
                <div style={{ textAlign: "center", margin: "10px" }}>Hit Dice Type: d{hitDiceType}</div>

                <div style={{ marginBottom: "0x" }}>
                    <NumberInput onChange={(value) => updatePlayerHitDice(value, hitDiceType)} value={hitDiceAmount} />
                </div>

                <div style={{ marginBottom: "30px" }}>
                    <Stack direction="row" justify="space-between">
                        <Stack direction="row">
                            <Button
                                paddingBlock="20px"
                                width="50px"
                                onClick={() => updatePlayerHitDice(hitDiceAmount - 1, hitDiceType)}
                            >-1</Button>
                            <Button
                                paddingBlock="20px"
                                width="50px"
                                onClick={() => updatePlayerHitDice(hitDiceAmount + 1, hitDiceType)}
                            >+1</Button>
                        </Stack>

                        <Button
                            paddingBlock="20px"
                            width="50px"
                            onClick={() => updatePlayerHitDice(maxDicePool[hitDiceType], hitDiceType)}
                        >Max</Button>
                    </Stack>
                </div>
            </div>

        })}
        </Stack>



    </Stack>}>
        {Object.keys(maxDicePool).map((hitDiceType) => {

            const hitDiceAmount = playerHitDice[hitDiceType] ?? 0
            const maxHitDiceAmount = maxDicePool[hitDiceType]

            return <div key={`hit-dice-box-d${hitDiceType}`}>{hitDiceAmount}/{maxHitDiceAmount}d{hitDiceType}</div>
        })
}

    </BodySection>


}

export default HitDice