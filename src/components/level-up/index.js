import { useState } from "react"
import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Button from "../button"
import Stack from "../stack"
import { CLASS_LIST, CLASS_SORCERER, getClassHitDice } from "../../constants/player-classes"
import { getCasterLevel, getMaxDicePool, getMaxHp, spellSlotsForCasterLevel } from "../../utils/calculations"
import NumberInput from "../number-input"
import Checkbox from "../checkbox"


const LevelUp = () => {


    const { 
        playerClassList, 
        setPlayerClassList,
        playerFirstClass,
        isTough,
        setIsTough,
        isHillDwarf,
        setIsDraconicSorcerer,
        isDraconicSorcerer, 
        playerCon,
        setPlayerCon,
        maxHitPoints,
        setPlayerLevel,
        playerLevel, setMaxDicePool,
        setMaxSpellSlots,
        maxSpellSlots,
        currentSpellSlots,
        setCurrentSpellSlots
    } = useStateContext()


    const [showAllClasses, setShowAllClasses] = useState(false)
    const [levellingClass, setLevellingClass] = useState(Object.keys(playerClassList)[0])
    const [draconic, setDraconic] = useState(isDraconicSorcerer)
    const [tough, setTough] = useState(isTough)
    const [con, setCon] = useState(playerCon)


    let newPlayerClassList = { ...playerClassList }
    if (newPlayerClassList[levellingClass]) {
        newPlayerClassList[levellingClass] += 1
    } else {
        newPlayerClassList[levellingClass] = 1
    }
    const newMaxHp = getMaxHp(newPlayerClassList, playerFirstClass, con, tough, isHillDwarf, draconic)


    const getSpellSlotDifference = () => {
        const newMaxSpellSlots = spellSlotsForCasterLevel(getCasterLevel(newPlayerClassList))
        let out = [0,0,0,0,0,0,0,0,0]
        let allZero = true
        for (let i = 0; i < 9; i++) {
            out[i] = newMaxSpellSlots[i]-maxSpellSlots[i]
            if (out[i] !== 0) {
                allZero = false
            }
        }
        return {out, allZero}
    }

    const {out: spellSlotsDifference, allZero: noNewSpellSlots} = getSpellSlotDifference()

    return <BodySection title={"Level Up!"} width="200px" modalWidth={showAllClasses ? "80%" : "60%"} 
    onDone={() => {
        setPlayerClassList(newPlayerClassList)
        setIsTough(tough)
        setIsDraconicSorcerer(draconic)
        setPlayerCon(con)
        setPlayerLevel(playerLevel + 1)
        setMaxDicePool(getMaxDicePool(newPlayerClassList))
        setMaxSpellSlots(spellSlotsForCasterLevel(getCasterLevel(newPlayerClassList)))

        let newSpellSlotsTotal = [...currentSpellSlots]
        for (let i = 0; i < 9; i++) {
            newSpellSlotsTotal[i] += spellSlotsDifference[i]
        }
        setCurrentSpellSlots(newSpellSlotsTotal)
        

    }}
    
    
    modalContent={
        <div style={{ paddingBlock: "20px" }}>
            <h4>Which class are you increasing?</h4>
            <Stack direction="column" gap="20px">



                <Stack direction="row" justify="center" wrap="wrap" width={"100%"}>
                    {CLASS_LIST.map((classType) => {
                        return <div key={`${classType}-button`} style={{ display: showAllClasses || Object.keys(playerClassList).includes(classType) ? undefined : "none" }}><Button

                            width="100px"
                            paddingBlock="20px"
                            disabledBackground="green"
                            disabled={levellingClass === classType}
                            background={"gray"}
                            onClick={() => { setLevellingClass(classType) }}
                        >
                            {classType}<br />
                            {playerClassList[classType] ?? 0} {levellingClass === classType && `-> ${(playerClassList[classType] ?? 0) + 1}`}
                        </Button></div>
                    })}
                    <Button width="100px"
                        paddingBlock="20px"
                        onClick={() => {
                            setShowAllClasses((prev) => {
                                const newValue = !prev
                                if (newValue === false) {
                                    setLevellingClass(Object.keys(playerClassList)[0])
                                }
                                return newValue
                            })
                        }}
                    >
                        {showAllClasses ? "- Cancel New Class" : "+ Add New Class"}
                    </Button>
                </Stack>
                <div>
                    <h4>Update your con modifier/feats:</h4>
                    <Stack direction="row">
                        <NumberInput value={con} onChange={setCon} />
                        <div style={{ marginLeft: "20px" }}>
                            <Stack direction="row" justify="flex-end">
                                <Checkbox value={tough} onChange={setTough} label={"Has the Tough feat?"} />
                                <Checkbox disabled={levellingClass !== CLASS_SORCERER} value={draconic} onChange={setDraconic} label={"Is Draconic Sorcerer?"} />
                            </Stack>
                        </div>

                    </Stack>
                </div>
                <Stack direction="row" justify="center">
                    <div style={{ textAlign: "center" }}>
                        <b>You will gain:</b><br />
                        Max HP: {maxHitPoints} -{'>'} {newMaxHp}, 
                        Hit Dice: +1d{getClassHitDice(levellingClass)}<br/>
                        {!noNewSpellSlots && <div>Spell Slots: 
                        {spellSlotsDifference.map((value, index) => {
                            if (value > 0) {
                                return <div key={`spell-slot-level-${index+1}`}>
                                    +{value} Lvl. {index+1}{index < 8 ? "; " : ""}
                                </div>
                            } else {
                                return <div key={`spell-slot-level-${index+1}`}></div>
                            }
                        })}</div>}
                    </div>
                </Stack>

            </Stack>
        </div>
    } />

}


export default LevelUp