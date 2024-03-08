import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Button from "../button"
import Stack from "../stack"


const SpellSlots = () => {

    const { currentSpellSlots, maxSpellSlots, setCurrentSpellSlots } = useStateContext()
    const spellList = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    const updateSpellSlotAmount = (slot, amount) => {
        let newSpellSlots = [...currentSpellSlots]
        newSpellSlots[slot] += amount
        if (newSpellSlots[slot] < 0) {
            newSpellSlots[slot] = 0
        }
        if (newSpellSlots[slot] > maxSpellSlots[slot]) {
            newSpellSlots[slot] = maxSpellSlots[slot]
        }

        setCurrentSpellSlots(newSpellSlots)
    }


    return <BodySection title={"Spell Slots"} modalWidth={"60%"} modalContent={
        <div style={{ marginBlock: "20px" }}>
            <Stack direction="row" wrap="wrap" justify="center" gap="20px">
                {spellList.map((value) => maxSpellSlots[value] > 0 ? <div style={{ width: "30%" }} key={`${value + 1}-spell-slot-modal`}>
                    <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "16pt" }}>Level {value + 1}:  {currentSpellSlots[value]}/{maxSpellSlots[value]}</div>
                    <Stack direction="row" justify="center">
                        <Button width="2ch" onClick={() => updateSpellSlotAmount(value, -1)}>-</Button>
                        <Button width="2ch" onClick={() => updateSpellSlotAmount(value, 1)}>+</Button>

                    </Stack>

                </div> : <div key={`${value + 1}-spell-slot-modal`}></div>)}
            </Stack></div>}>

        <Stack direction="row" wrap="wrap" align={"center"} justify="center">
            {spellList.map((value) => <div style={{ width: "48%", textAlign: "center" }} key={`${value + 1}-spell-slot-body`}>
                {maxSpellSlots[value] > 0 ? <div>Lvl. {value + 1}: {currentSpellSlots[value]}/{maxSpellSlots[value]}</div> : ""}
            </div>)}
        </Stack>

    </BodySection>

}


export default SpellSlots