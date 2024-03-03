import { getClassHitDice } from "../constants/player-classes"


export const getMaxHp = (classType, level, con, tough, hillDwarf, draconicSorcerer) => {
    const hitDice = getClassHitDice(classType)
    const averageRoll = Math.floor((hitDice+1)/2)
    const conModifier = Math.floor((con-10)/2)
    

    const out = (hitDice+conModifier) + 
        (level-1)*(averageRoll+conModifier) +
        (tough ? 1 : 0)*(level*2) +
        (hillDwarf ? 1 : 0)*level +
        (draconicSorcerer ? 1: 0)*level

    if (out <= 0) {
        return 1
    } else {
        return out
    }

}
const expTable = [
    0,
    300,
    900,
    2700,
    6500,
    14000,
    23000,
    34000,
    48000,
    64000,
    85000,
    100000,
    120000,
    140000,
    165000,
    195000,
    225000,
    265000,
    305000,
    355000
]

export const getExpToNextLevel = (exp, level) => {
    return Math.max(0, expTable[level]-exp)
}
