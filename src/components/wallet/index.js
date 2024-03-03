import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import NumberInput from "../number-input"
import Stack from "../stack"

const Wallet = () => {


    const coinRow = (
        getter, setter, label
        ) => <div style={{
        marginBlock:"10px"
    }}> 
        <Stack direction="row">
          
        <NumberInput value={getter} onChange={(value) => {
            if (value < 0) {
                value = 0
            }
            
            setter(Number.parseInt(value))
            
            }} /><div>{label}</div>
    </Stack>
    </div>

    const {
        coinCP, setCoinCP,
        coinSP, setCoinSP,
        coinEP, setCoinEP,
        coinGP, setCoinGP,
        coinPP, setCoinPP,
    } = useStateContext()
    return <BodySection
        modalContent={
            <div>
                {coinRow(coinPP, setCoinPP, "PP (10 GP)")}
                {coinRow(coinGP, setCoinGP, "GP")}
                {coinRow(coinEP, setCoinEP, "EP (1/2 GP)")}
                {coinRow(coinSP, setCoinSP, "SP (1/10 GP)")}
                {coinRow(coinCP, setCoinCP, "CP (1/100 GP)")}
            </div>
        }

        title="Wallet">
        <div>{coinPP} PP</div>
        <div>{coinGP} GP</div>
        <div>{coinEP} EP</div>
        <div>{coinSP} SP</div>
        <div>{coinCP} CP</div>
    </BodySection>

}

export default Wallet