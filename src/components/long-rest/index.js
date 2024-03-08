import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"


const LongRest = () => {

    const {
        setCurrentSpellSlots, maxSpellSlots, 
        maxHitPoints, setPlayerCurrentHp,
        setPlayerHitDice, maxDicePool,
        setPlayerTempHp
    } = useStateContext()


    return <BodySection width="20ch" title={"Long Rest"} 
    onDone={() => {
        setCurrentSpellSlots(maxSpellSlots)
        setPlayerCurrentHp(maxHitPoints)
        setPlayerHitDice(maxDicePool)
        setPlayerTempHp(0)

    }}
    
    modalContent={<div>
        <h4>Select "Done" to take a long rest, otherwise close this window to cancel.</h4>
    </div>}/>
}

export default LongRest