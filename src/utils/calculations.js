import { CLASS_SORCERER, getClassHitDice } from "../constants/player-classes"


export const getMaxHp = (classObject, firstPlayerClass, con, tough, hillDwarf, draconicSorcerer) => {

    const classes = Object.keys(classObject)
    const firstDraconic = firstPlayerClass === CLASS_SORCERER && draconicSorcerer
    const conModifier = Math.floor((con - 10) / 2)


    let data = { ...classObject }

    data[firstPlayerClass] -= 1

    let out = getClassHitDice(firstPlayerClass) + conModifier + (tough ? 2 : 0) + (hillDwarf ? 1 : 0) + (firstDraconic ? 1 : 0)

    for (let i = 0; i < classes.length; i++) {
        const classType = classes[i]
        const hitDice = getClassHitDice(classType)
        const averageRoll = Math.floor((hitDice + 1) / 2)
        while (data[classType] > 0) {

            data[classType] -= 1
            out += (averageRoll + conModifier) +
                (tough ? 2 : 0) +
                (hillDwarf ? 1 : 0) +
                (classType === CLASS_SORCERER && draconicSorcerer ? 1 : 0)


        }

    }
    if (out <= 0) {
        return 1
    } else {
        return out
    }

}

export const getMaxDicePool = (playerClassList) => {
    let maxDicePool = {}
    const playerClasses = Object.keys(playerClassList)
    for (let i = 0; i < playerClasses.length; i++) {
        const diceType = getClassHitDice(playerClasses[i])
        if (Object.keys(maxDicePool).includes(`${diceType}`)) {
            maxDicePool[diceType] += playerClassList[playerClasses[i]]
        } else {
            maxDicePool[diceType] = playerClassList[playerClasses[i]]
        }

    }
    return maxDicePool
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
    return Math.max(0, expTable[level] - exp)
}
