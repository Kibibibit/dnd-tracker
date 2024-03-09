import { useState } from "react"
import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import NumberInput from "../number-input"
import Stack from "../stack"


const ShortRest = () => {

    const {
        playerCurrentHp,
        maxHitPoints, setPlayerCurrentHp,
        maxDicePool,
        playerHitDice,
        setPlayerHitDice,
        playerCon
    } = useStateContext()


    const [hitDiceUsed, setHitDiceUsed] = useState({ "6": 0, "8": 0, "10": 0, "12": 0 })
    const [hpRestored, setHpRestored] = useState(0)

    const updateHitDice = (hitDiceType, value) => {
        if (value < 0) {
            value = 0
        }
        if (value > playerHitDice[`${hitDiceType}`]) {
            value = playerHitDice[`${hitDiceType}`]
        }
        setHitDiceUsed((prev) => {
            let out = { ...prev }
            out[`${hitDiceType}`] = value
            return out
        })
    }

    const getDiceCount = () => {
        let out = 0;
        Object.keys(hitDiceUsed).forEach((key) => {
            out += Number.parseInt(hitDiceUsed[key])
            console.log(out)
        })
        return out
    }

    const diceCount = getDiceCount()

    const getMaxPossibleHp = () => {
        let out = 0;
        Object.keys(hitDiceUsed).forEach((key) => {
            let diceValue = Number.parseInt(key)
            out += hitDiceUsed[key] * diceValue
        })
        if (hpRestored > out) {
            setHpRestored(out)
        }
        return out
    }


    const maxPossibleHp = getMaxPossibleHp()

    const conModifier = Math.floor((playerCon - 10) / 2)

    const updateHpRestored = (value) => {
        if (value < 0) {
            value = 0
        }
        if (value > maxPossibleHp) {
            value = maxPossibleHp
        }
        setHpRestored(value)

    }

    const finalHpRestored = Number.parseInt(hpRestored) + (conModifier * diceCount)
    const newHp = Math.min(maxHitPoints, finalHpRestored+playerCurrentHp)

    return <BodySection width="20ch" title={"Short Rest"}
        onDone={() => {
            if (playerCurrentHp + finalHpRestored > maxHitPoints) {
                setPlayerCurrentHp(maxHitPoints)
            } else {
                setPlayerCurrentHp(playerCurrentHp + finalHpRestored)
            }
            let newHitDice = {...playerHitDice}
            Object.keys(hitDiceUsed).forEach((key) => {
                newHitDice[key] -= hitDiceUsed[key]
            })
            setPlayerHitDice(newHitDice)
            setHitDiceUsed({ "6": 0, "8": 0, "10": 0, "12": 0 })
            setHpRestored(0)

        }}
        modalWidth={"80%"}
        modalContent={<div>
            <h4>Select hit dice to roll:</h4>
            <Stack direction="row" wrap="wrap" justify="center">
                {Object.keys(maxDicePool).map((hitDiceType) => {
                    return <div key={`${hitDiceType}-box`} style={{ width: "48%" }}>
                        <Stack direction="row" justify="center">
                            <NumberInput value={hitDiceUsed[`${hitDiceType}`]} onChange={(value) => updateHitDice(hitDiceType, value)} />
                            <div style={{ width: "8ch" }}>/{playerHitDice[hitDiceType]} d{hitDiceType}</div>
                        </Stack>

                    </div>
                })}
            </Stack>
            <h4>Input total roll:</h4>
            <NumberInput value={hpRestored} onChange={updateHpRestored} />
            <h4>HP restored:</h4>
            <div>= Roll + (Con Modifier * Dice Rolled)</div>
            <div>
                = {hpRestored}  + ({conModifier} * {diceCount}) <br />
                = {finalHpRestored} HP
            </div>
            <div>New Total: {newHp}/{maxHitPoints}</div>

        </div>} />
}

export default ShortRest