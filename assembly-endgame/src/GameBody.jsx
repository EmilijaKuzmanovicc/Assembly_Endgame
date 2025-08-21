import React, { useEffect } from "react";
import Language from "./components/Language";
import Letter from "./components/Letter";
import FoundLetter from "./components/FoundLetter";
import FinishGameText from "./components/FinishGameText";
import ReactConfetti from "react-confetti";
import { languages } from "./data/languages";
import { getFarewellText } from "./data/utils";
import Compare from "./utils/Functions/Comare";
import { gameReducer, INITIAL_STATE } from "./utils/Hooks/GameReducer";

export default function GameBody() {
  const [reduceState, dispatch] = React.useReducer(gameReducer, INITIAL_STATE);

  // console.log("reducer:", reduceState.currentWord);
  const redlistLanguages = reduceState.languages.map((lang) => <Language key={lang.id} {...lang} />);
  const redselectedWord = reduceState.currentWord.map((current) => <FoundLetter key={current.id} {...current} />);
  const redlistLetters = reduceState.letters.map((letter) => <Letter key={letter.id} {...letter} func={() => SwitchButton(letter.id)} />);

  function SwitchButton(id) {
    if (reduceState.foundedState < 8) {
      const clickedLetter = reduceState.letters.find((letter) => letter.id === id);
      const comparedLetter = Compare(clickedLetter.letter, reduceState.currentWord);
      if (comparedLetter === 2)
        dispatch({
          type: "LETTER_MISS",
          id: id,
          clickedLetter: clickedLetter,
        });
      else if (comparedLetter === 1)
        dispatch({
          type: "LETTER_HIT",
          id: id,
          clickedLetter: clickedLetter,
        });
    }
  }

  useEffect(() => {
    if (reduceState.currentWord.every((current) => current.showLetter)) {
      dispatch({ type: "FOUNDED_WORD" });
    }
  }, [reduceState.currentWord]);

  function restartGame() {
    dispatch({ type: "RESET_GAME" });
  }

  function guessWord(word, state) {
    if (state === 8) return <FinishGameText color="#ba2a2a" text="Game over!" message="You lose! Better start learning Assembly 😭" border="none" />;
    if (word) return <FinishGameText color="#10a95b" text="You win!" message="Well done! 🎉" border="none" />;
    if (state > -1 && state < 8) return <FinishGameText color="#7a5ea7" text={getFarewellText(languages[state].name)} message="" border="2px dashed #323232" />;
    return <FinishGameText color="" text="" message="" border="" />;
  }

  return (
    <div className="game-body">
      {reduceState.foundedWord && reduceState.foundedState < 8 && <ReactConfetti recycle={false} numberOfPieces={2000} className="react-confetti" />}
      {guessWord(reduceState.foundedWord, reduceState.foundedState)}
      <div className="list-languages">{redlistLanguages}</div>
      <div className="list-letters-word">{redselectedWord}</div>
      <div className="list-letters">{redlistLetters}</div>
      {(reduceState.foundedState === 8 || reduceState.foundedWord) && (
        <button onClick={restartGame} className="new-game-button">
          New Game{" "}
        </button>
      )}
    </div>
  );
}
