import { languages } from "../data/languages";
import Language from "./Language";
import React from "react";
import { nanoid } from "nanoid";
import { letters } from "../data/letter";
import Letter from "./Letter";
import FoundLetter from "./FoundLetter";
import { words } from "../data/words";
import GetRandomNumer from "./GetRandomNumber";
import { getFarewellText } from "../data/utils";
import Compare from "../utils/Comare";
export default function GameBody() {
  const listLanguages = languages.map((currentLanguage) => <Language key={currentLanguage.id} color={currentLanguage.color} name={currentLanguage.name} backgroundColor={currentLanguage.backgroundColor} />);

  const [currentWord, setCurrentWord] = React.useState(
    words[GetRandomNumer()].split("").map((char, index) => ({
      id: index,
      letter: char.toUpperCase(),
      showLetter: false,
    }))
  );

  const [lettersState, setLettersState] = React.useState(
    letters.map((letter) => ({
      id: nanoid(),
      letter,
      isOn: false,
      isFound: 0,
    }))
  );
  const listLetters = lettersState.map((letterObj) => <Letter key={letterObj.id} id={letterObj.id} letter={letterObj.letter} isOn={letterObj.isOn} func={() => SwitchButton(letterObj.id)} isFound={letterObj.isFound} />);

  const listLetersWord = currentWord.map((currentlLetter) => <FoundLetter key={currentlLetter.id} letter={currentlLetter.letter} showLetter={currentlLetter.showLetter} />);
  function SwitchButton(id) {
    setLettersState((prev) => {
      return prev.map((currLetter) => {
        return currLetter.id === id ? { ...currLetter, isOn: !currLetter.isOn, isFound: currLetter.isFound !== Compare(currLetter.letter, currentWord) ? Compare(currLetter.letter, currentWord) : currLetter.isFound } : currLetter;
      });
    });

    setCurrentWord((prev) => {
      const letterToFound = lettersState.find((e) => e.id === id);
      console.log("letterToFound", letterToFound);

      return prev.map((currLetterWord) => {
        const value = Compare(letterToFound.letter, currentWord);

        return value === 1 ? { ...currLetterWord, showLetter: currLetterWord.letter === letterToFound.letter ? !currLetterWord.showLetter : currLetterWord.showLetter } : currLetterWord;
      });
    });
  }

  return (
    <div className="game-body">
      <div className="message">{getFarewellText(listLanguages[2].props.name)} </div>
      <div className="list-languages">{listLanguages}</div>

      <div className="list-letters-word">{listLetersWord}</div>
      <div className="list-letters">{listLetters}</div>
      <button className="new-game-button">New Game</button>
    </div>
  );
}
