

export const CLASS_BARBARIAN = "Barbarian"
export const CLASS_BARD = "Bard"
export const CLASS_CLERIC = "Cleric"
export const CLASS_DRUID = "Druid"
export const CLASS_FIGHTER = "Fighter"
export const CLASS_MONK = "Monk"
export const CLASS_PALADIN = "Paladin"
export const CLASS_RANGER = "Ranger"
export const CLASS_ROGUE = "Rogue"
export const CLASS_SORCERER = "Sorcerer"
export const CLASS_WARLOCK = "Warlock"
export const CLASS_WIZARD = "Wizard"


export const CLASS_LIST = [
    CLASS_BARBARIAN, 
    CLASS_BARD, 
    CLASS_CLERIC, 
    CLASS_DRUID, 
    CLASS_FIGHTER, 
    CLASS_MONK, 
    CLASS_PALADIN, 
    CLASS_RANGER, 
    CLASS_ROGUE, 
    CLASS_SORCERER, 
    CLASS_WARLOCK, 
    CLASS_WIZARD
]

const hitDice = {
    [CLASS_BARBARIAN]:12,
    [CLASS_BARD]: 8,
    [CLASS_CLERIC]: 8,
    [CLASS_DRUID]: 8,
    [CLASS_FIGHTER]: 10,
    [CLASS_MONK]: 8,
    [CLASS_PALADIN]: 10,
    [CLASS_RANGER]: 10,
    [CLASS_ROGUE]: 8,
    [CLASS_SORCERER]: 6,
    [CLASS_WARLOCK]: 8,
    [CLASS_WIZARD]: 6
}

export const getClassHitDice = (playerClass) => hitDice[playerClass] ?? 8