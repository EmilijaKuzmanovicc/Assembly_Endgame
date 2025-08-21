import { languages } from "../../data/languages"
import { letters } from "../../data/letter"
import Compare from "../Functions/Comare"
import GetNewWord from "../Functions/GetNewWord"
import { nanoid } from "nanoid"
export const INITIAL_STATE = {
    foundedState: -1,
    foundedWord: false,
    languages: languages.map((lang) => ({ ...lang, found: false })),
    currentWord: GetNewWord(),
    letters: letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 })),
}

const getNewLetters = (state, id) => state.letters.map(letter => {
    const comparedValue = Compare(letter.letter, state.currentWord)
    if (letter.id !== id) return letter
    return {
        ...letter,
        isOn: !letter.isOn,
        isFound: letter.isFound !== comparedValue ? comparedValue : letter.isFound,
    }
})
export const gameReducer = (state, action) => {
    switch (action.type) {
        case "FOUNDED_WORD":
            return {
                ...state,
                foundedWord: true
            }
        case "LETTER_HIT": {
            const newLetters = getNewLetters(state, action.id)
            console.log((state.foundedWord));
            const newCurrentWord = state.currentWord.map(current => {
                if (action.clickedLetter.letter === current.letter)


                    return { ...current, showLetter: true }
                return current
            })
            return { ...state, letters: newLetters, currentWord: newCurrentWord }
        }
        case "LETTER_MISS": {

            const newLettersList = getNewLetters(state, action.id)
            const newLanguagesList = state.languages.map(language => {
                if (language.id === state.foundedState + 1)
                    return { ...language, found: true }
                return language
            })

            const newCurrentWord = state.currentWord.map((current) => {
                if (state.foundedState + 1 === 8) {
                    if (!current.showLetter) return { ...current, showLetter: true, color: "#ff0000" };
                }
                return current;

            });

            return { ...state, letters: newLettersList, languages: newLanguagesList, foundedState: state.foundedState + 1, currentWord: newCurrentWord }

        }
        case "RESET_GAME":
            return INITIAL_STATE;

        default:
            return state
    }
}
