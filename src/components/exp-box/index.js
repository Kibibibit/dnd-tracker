import { useStateContext } from "../../providers/state-provider"
import { getExpToNextLevel } from "../../utils/calculations"
import BodySection from "../body-section"
import NumberInput from "../number-input"
import Stack from "../stack"

const ExpBox = () => {

    const { playerExp, playerLevel, setPlayerExp } = useStateContext()


    const expToNextLevel = getExpToNextLevel(playerExp, playerLevel)

    return <BodySection title={"Experience"}

        modalContent={<div>

            <Stack direction="row">

                <NumberInput value={playerExp} onChange={(value) => {
                    if (value < 0) {
                        value = 0
                    }

                    setPlayerExp(Number.parseInt(value))

                }} /><div>XP</div>
            </Stack>

        </div>}

    >
        <div>Current Exp: {playerExp}</div>
        {expToNextLevel > 0 ? <div>Exp to Next Level: {expToNextLevel}</div> : playerLevel < 20 ? <div>Level up available!</div> : <div>Max Level Reached!</div>}
        <Stack direction="row" justify="center" padding="10px">

        </Stack>

    </BodySection>

}


export default ExpBox