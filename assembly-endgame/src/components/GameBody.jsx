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
  const listOfLetters = letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 }));
  const [foundedState, setFoundedState] = React.useState(-1);
  const [foundedWord, setFoundedWord] = React.useState(false);

  const [gameState, setGameState] = React.useState({
    languages: languages.map((prev) => ({ ...prev, found: false })),
    currentWord: GetNewWord(),
    letters: listOfLetters,
  });

  const listLanguages = gameState.languages.map((languageObj) => <Language key={languageObj.id} color={languageObj.color} name={languageObj.name} backgroundColor={languageObj.backgroundColor} found={languageObj.found} />);

  const listLetersWord = gameState.currentWord.map((currentlLetter) => <FoundLetter key={currentlLetter.id} letter={currentlLetter.letter} showLetter={currentlLetter.showLetter} color={currentlLetter.color} />);

  const listLetters = gameState.letters.map((letterObj) => <Letter key={letterObj.id} id={letterObj.id} letter={letterObj.letter} isOn={letterObj.isOn} func={() => SwitchButton(letterObj.id)} isFound={letterObj.isFound} />);

  React.useEffect(() => {
    if (foundedState > -1) setGameState((prev) => ({ ...prev, languages: prev.languages.map((lang) => (lang.id === foundedState ? { ...lang, found: true } : lang)) }));

    if (foundedState === 8) setGameState((prev) => ({ ...prev, currentWord: prev.currentWord.map((curr) => (curr.showLetter ? curr : { ...curr, showLetter: true, color: "#ff0000" })) }));
  }, [foundedState]);

  React.useEffect(() => {
    const numFound = gameState.currentWord.every((e) => e.showLetter === true);
    if (numFound) setFoundedWord(true);
  }, [gameState.currentWord]);

  function SwitchButton(id) {
    if (foundedState !== 8 || !foundedWord) {
      setGameState((prev) => {
        const updatedLetters = prev.letters.map((currLetter) => (currLetter.id === id ? { ...currLetter, isOn: !currLetter.isOn, isFound: currLetter.isFound !== Compare(currLetter.letter, prev.currentWord) ? Compare(currLetter.letter, prev.currentWord) : currLetter.isFound } : currLetter));

        const letterToFound = prev.letters.find((e) => e.id === id);
        const compareLetters = Compare(letterToFound.letter, prev.currentWord);

        let updatedWord = prev.currentWord;
        if (compareLetters === 1) {
          updatedWord = prev.currentWord.map((currLetterWord) => (currLetterWord.letter === letterToFound.letter ? { ...currLetterWord, showLetter: true } : currLetterWord));
        } else if (compareLetters === 2) {
          setFoundedState((prevState) => prevState + 1);
        }

        return { ...prev, letters: updatedLetters, currentWord: updatedWord };
      });
    }
  }

  function restartGame() {
    setFoundedState(-1);
    setFoundedWord(false);
    setGameState({
      languages: languages.map((lang) => ({ ...lang, found: false })),
      currentWord: GetNewWord(),
      letters: listOfLetters,
    });
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
