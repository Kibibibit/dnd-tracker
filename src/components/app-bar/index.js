import { useStateContext } from "../../providers/state-provider"


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
        <h2 style={{margin:"0"}}>Level {playerLevel} {displayString}</h2>
    </div>

}


export default AppBar