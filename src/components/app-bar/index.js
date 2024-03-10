import { useStateContext } from "../../providers/state-provider"
import BodySection from "../body-section"
import Stack from "../stack"


const AppBar = () => {


    const {playerClassList, playerLevel} = useStateContext()

    const classes = Object.keys(playerClassList)

    const displayString = classes.length === 0 ? "Commoner" : classes.join(", ")

    return <div style = {{
        position:'relative',
        padding:"20px",
        paddingLeft:"20px",
        background:"lightblue"
    }}>
        <Stack direction="row" justify="space-between">
        <h2 style={{margin:"0"}}>Level {playerLevel} {displayString}</h2>
        <BodySection width="20ch" title={"Clear"} modalContent={"Are you sure?"} onDone={()=>localStorage.clear()}></BodySection>
        </Stack>
       
    </div>

}


export default AppBar