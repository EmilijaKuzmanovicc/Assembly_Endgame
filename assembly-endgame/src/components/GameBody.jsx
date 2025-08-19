import Language from "./Language";
import React from "react";
import { nanoid } from "nanoid";
import { letters } from "../data/letter";
import Letter from "./Letter";
import FoundLetter from "./FoundLetter";
import { getFarewellText } from "../data/utils";
import Compare from "../utils/Comare";
import { languages } from "../data/languages";
import FinishGameText from "./FinishGameText";
import ReactConfetti from "react-confetti";
import GetNewWord from "./GetNewWord";
export default function GameBody() {
  const [foundedState, setFoundedState] = React.useState(-1);
  const [foundedWord, setFoundedWord] = React.useState(false);

  const [languagesState, setLanguagesState] = React.useState(languages.map((prev) => ({ ...prev, found: false })));
  const listLanguages = languagesState.map((languageObj) => <Language key={languageObj.id} color={languageObj.color} name={languageObj.name} backgroundColor={languageObj.backgroundColor} found={languageObj.found} />);

  const [currentWord, setCurrentWord] = React.useState(GetNewWord());
  const listLetersWord = currentWord.map((currentlLetter) => <FoundLetter key={currentlLetter.id} letter={currentlLetter.letter} showLetter={currentlLetter.showLetter} color={currentlLetter.color} />);

  const [lettersState, setLettersState] = React.useState(letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 })));
  const listLetters = lettersState.map((letterObj) => <Letter key={letterObj.id} id={letterObj.id} letter={letterObj.letter} isOn={letterObj.isOn} func={() => SwitchButton(letterObj.id)} isFound={letterObj.isFound} />);

  React.useEffect(() => {
    if (foundedState > -1) {
      setLanguagesState((prev) => prev.map((lang) => (lang.id === foundedState ? { ...lang, found: true } : lang)));
    }
    if (foundedState === 8) {
      setCurrentWord((prev) => {
        return prev.map((curr) => {
          return curr.showLetter ? curr : { ...curr, showLetter: true, color: "#ff0000" };
        });
      });
    }
  }, [foundedState]);

  React.useEffect(() => {
    const numFound = currentWord.every((e) => e.showLetter === true);
    if (numFound) setFoundedWord(true);
  }, [currentWord]);

  function SwitchButton(id) {
    if (foundedState !== 8 || !foundedWord) {
      setLettersState((prev) => {
        return prev.map((currLetter) => {
          return currLetter.id === id ? { ...currLetter, isOn: !currLetter.isOn, isFound: currLetter.isFound !== Compare(currLetter.letter, currentWord) ? Compare(currLetter.letter, currentWord) : currLetter.isFound } : currLetter;
        });
      });

      setCurrentWord((prev) => {
        const letterToFound = lettersState.find((e) => e.id === id);
        const compareLetters = Compare(letterToFound.letter, prev);

        if (compareLetters === 1) return prev.map((currLetterWord) => (currLetterWord.letter === letterToFound.letter ? { ...currLetterWord, showLetter: true } : currLetterWord));
        else if (compareLetters === 2) setFoundedState((prev) => prev + 1);

        return prev;
      });
    }
  }
  function restartGame() {
    setFoundedState(-1);
    setLanguagesState(languages.map((lang) => ({ ...lang, found: false })));
    setCurrentWord(GetNewWord());
    setLettersState(
      letters.map((letter) => ({
        id: nanoid(),
        letter,
        isOn: false,
        isFound: 0,
      }))
    );
    setFoundedWord(false);
  }

  function guessWord(foundedState, foundedWord) {
    if (foundedState === 8) return <FinishGameText color="#ba2a2a" text="Game over!" message="You lose! Better start learning Assembly 😭" border="none" />;
    if (foundedWord) return <FinishGameText color="#10a95b" text="You win!" message="Well done! 🎉" border="none" />;
    if (foundedState > -1 && foundedState < 8) return <FinishGameText color="#7a5ea7" text={getFarewellText(listLanguages[foundedState].props.name)} message="" border="2px dashed #323232" />;
    return <FinishGameText color="" text="" message="" border="" />;
  }

  return (
    <div className="game-body">
      {foundedWord && foundedState < 8 ? <ReactConfetti recycle={false} numberOfPieces={2000} className="react-confetti" /> : null}
      {guessWord(foundedState, foundedWord)}
      <div className="list-languages">{listLanguages}</div>
      <div className="list-letters-word">{listLetersWord}</div>
      <div className="list-letters">{listLetters}</div>
      {foundedState === 8 || foundedWord ? (
        <button onClick={() => restartGame()} className="new-game-button">
          New Game
        </button>
      ) : null}
    </div>
  );
}
