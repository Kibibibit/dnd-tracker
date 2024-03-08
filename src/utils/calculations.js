import { CLASS_SORCERER, getCasterLevelMod, getClassHitDice } from "../constants/player-classes"


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

const spellSlotTable = {
    0: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
}

export const spellSlotsForCasterLevel = (casterLevel) => {
    return spellSlotTable[casterLevel] ?? spellSlotTable[0]
}

export const getCasterLevel = (playerClassList) => {
    let fullCasters = 0
    let halfCasters = 0
    const playerClasses = Object.keys(playerClassList)
    for (let i = 0; i < playerClasses.length; i++) {
        const casterMod = getCasterLevelMod(playerClasses[i])
        if (casterMod === 0.5) {
            halfCasters += playerClassList[playerClasses[i]]
        } else if (casterMod === 1) {
            fullCasters += playerClassList[playerClasses[i]]
        }

    }
    return Math.floor(halfCasters/2)+fullCasters
}