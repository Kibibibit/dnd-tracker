import { useStateContext } from "../../providers/state-provider"


const AppBar = () => {


    const {playerClass, playerLevel} = useStateContext()

    return <div style = {{
        position:'relative',
        padding:"20px",
        paddingLeft:"20px",
        background:"lightblue"
    }}>
        <h2 style={{margin:"0"}}>Level {playerLevel} {playerClass ?? "Commoner"}</h2>
    </div>

}


export default AppBar