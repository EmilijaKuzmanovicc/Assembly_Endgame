import { languages } from "../../data/languages"
import { letters } from "../../data/letter"
import GetNewWord from "../Functions/GetNewWord"
import { nanoid } from "nanoid"
export const INITIAL_STATE = {
    foundedState: -1,
    foundedWord: false,
    languages: languages.map((lang) => ({ ...lang, found: false })),
    currentWord: GetNewWord(),
    letters: letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 })),
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case "FOUNDED_WORD":
            return {
                ...state,
                foundedWord: true
            }
        case "FOUNDED_STATE":
            return {
                ...state,
                foundedState: state.foundedState + 1,
            }
        case "LANGUAGES":
            return {
                ...state,
                languages: state.languages.map((l) =>
                    l.id === action.payload.id ? action.payload : l
                ),

            }
        case "CURRENT_WORD":
            return {
                ...state,
                currentWord: state.currentWord.map((c) =>
                    c.id === action.payload.id ? action.payload : c
                ),

            }
        case "LETTERS":
            return {
                ...state,
                letters: state.letters.map((l) =>
                    l.id === action.payload.id ? action.payload : l
                ),

            }
        case "RESET_GAME":
            return INITIAL_STATE;

        default:
            return state
    }
}