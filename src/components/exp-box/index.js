import { useStateContext } from "../../providers/state-provider"
import { getExpToNextLevel } from "../../utils/calculations"
import BodySection from "../body-section"
import Stack from "../stack"

const ExpBox = () => {

    const {playerExp, playerLevel} = useStateContext()


    const expToNextLevel = getExpToNextLevel(playerExp, playerLevel)

    return <BodySection title={"Experience"}
    
        modalContent={<div>

            

        </div>}

    >
        <div>Current Exp: {playerExp}</div>
        {expToNextLevel > 0 ? <div>Exp to Next Level: {expToNextLevel}</div> : <div>Level up available!</div>}
        <Stack direction="row" justify="center" padding="10px">
        
        </Stack>
        
    </BodySection>

}


export default ExpBox