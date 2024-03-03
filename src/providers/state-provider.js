import { createContext, useContext, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage";
import { KEY_CON, KEY_CP, KEY_DRACONIC, KEY_EP, KEY_FIRST_LOAD, KEY_GP, KEY_HILL_DWARF, KEY_PLAYER_CLASS, KEY_PLAYER_CURRENT_HP, KEY_PLAYER_EXP, KEY_PLAYER_HIT_DICE, KEY_PLAYER_LEVEL, KEY_PLAYER_TEMP_HP, KEY_PP, KEY_SP, KEY_TOUGH } from "../constants/storage-keys";
import { getMaxHp } from "../utils/calculations";


const StateContext = createContext()


const StateProvider = ({ children }) => {

    const updateStateValue = (setter, key) => (value) => {
        setter(value)
        setLocalStorage(key)(value)
    }

    const useStorageState = (key, fromString = (value) => value, placeholder = undefined) => {
        const [getter, setter] = useState(fromString(getLocalStorage(key) ?? placeholder))
        return [getter, updateStateValue(setter, key)]
    }

    const useStorageStateBool = (key, placeholder) => useStorageState(key, value => value === "true", `${placeholder}`)
    const useStorageStateInt = (key, placeholder) => useStorageState(key, value => Number.parseInt(value), placeholder)

    const [firstLoad, setFirstLoad] = useStorageStateBool(KEY_FIRST_LOAD, true)
    const [isTough, setIsTough] = useStorageStateBool(KEY_TOUGH, false)
    const [isHillDwarf, setIsHillDwarf] = useStorageStateBool(KEY_HILL_DWARF, false)
    const [isDraconicSorcerer, setIsDraconicSorcerer] = useStorageStateBool(KEY_DRACONIC, false)
    const [playerCon, setPlayerCon] = useStorageStateInt(KEY_CON, 0)
    const [playerClass, setPlayerClass] = useStorageState(KEY_PLAYER_CLASS)
    const [playerLevel, setPlayerLevel] = useStorageStateInt(KEY_PLAYER_LEVEL, 1)
    const [coinPP, setCoinPP] = useStorageStateInt(KEY_PP, 0)
    const [coinGP, setCoinGP] = useStorageStateInt(KEY_GP, 0)
    const [coinEP, setCoinEP] = useStorageStateInt(KEY_EP, 0)
    const [coinSP, setCoinSP] = useStorageStateInt(KEY_SP, 0)
    const [coinCP, setCoinCP] = useStorageStateInt(KEY_CP, 0)
    const [playerHitDice, setPlayerHitDice] = useStorageStateInt(KEY_PLAYER_HIT_DICE, playerLevel)
    const [playerExp, setPlayerExp] = useStorageStateInt(KEY_PLAYER_EXP, 0)
    const [playerTempHp, setPlayerTempHp] = useStorageStateInt(KEY_PLAYER_TEMP_HP, 0)



    const maxHitPoints = getMaxHp(playerClass, playerLevel, playerCon, isTough, isHillDwarf, isDraconicSorcerer)
    const [playerCurrentHp, setPlayerCurrentHp] = useStorageStateInt(KEY_PLAYER_CURRENT_HP, maxHitPoints)




    const value = {
        playerClass,
        setPlayerClass,
        firstLoad,
        setFirstLoad,
        isTough,
        setIsTough,
        isHillDwarf,
        setIsHillDwarf,
        playerCon,
        setPlayerCon,
        isDraconicSorcerer,
        setIsDraconicSorcerer,
        playerLevel,
        setPlayerLevel,
        maxHitPoints,
        playerCurrentHp,
        setPlayerCurrentHp,
        coinPP, setCoinPP,
        coinGP, setCoinGP,
        coinEP, setCoinEP,
        coinSP, setCoinSP,
        coinCP, setCoinCP,
        playerHitDice,
        setPlayerHitDice,
        playerExp,setPlayerExp,
        playerTempHp, setPlayerTempHp
    }

    return <StateContext.Provider value={value}>
        {children}
    </StateContext.Provider>

}

export const useStateContext = () => useContext(StateContext)

export default StateProvider