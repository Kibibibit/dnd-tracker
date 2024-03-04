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

    return <BodySection title="Hit Dice" modalContent={<Stack>

        {Object.keys(maxDicePool).map((hitDiceType) => {

            const hitDiceAmount = playerHitDice[hitDiceType]

            return <div key={`hit-dice-content-d${hitDiceType}`}>
                <div style={{ textAlign: "center", margin: "10px" }}>Hit Dice Type: d{hitDiceType}</div>

                <div style={{ marginBottom: "20px" }}>
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



    </Stack>}>
        {Object.keys(maxDicePool).map((hitDiceType) => {

            const hitDiceAmount = playerHitDice[hitDiceType]
            const maxHitDiceAmount = maxDicePool[hitDiceType]

            return <div>{hitDiceAmount}/{maxHitDiceAmount}d{hitDiceType}</div>
        })
}

    </BodySection>


}

export default HitDice