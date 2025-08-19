import React from "react";
import { nanoid } from "nanoid";
import Language from "./Language";
import Letter from "./Letter";
import FoundLetter from "./FoundLetter";
import FinishGameText from "./FinishGameText";
import ReactConfetti from "react-confetti";
import GetNewWord from "./GetNewWord";
import { letters } from "../data/letter";
import { languages } from "../data/languages";
import { getFarewellText } from "../data/utils";
import Compare from "../utils/Comare";

export default function GameBody() {
  const [gameState, setGameState] = React.useState({
    finish: { foundedState: -1, foundedWord: false },
    languages: languages.map((lang) => ({ ...lang, found: false })),
    currentWord: GetNewWord(),
    letters: letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 })),
  });

  const listLanguages = gameState.languages.map((lang) => <Language key={lang.id} {...lang} />);
  const selectedWord = gameState.currentWord.map((current) => <FoundLetter key={current.id} {...current} />);
  const listLetters = gameState.letters.map((letter) => <Letter key={letter.id} {...letter} func={() => SwitchButton(letter.id)} />);
  function SwitchButton(id) {
    setGameState((prev) => {
      const letters = prev.letters.map((letter) =>
        letter.id === id
          ? {
              ...letter,
              isOn: !letter.isOn,
              isFound: letter.isFound !== Compare(letter.letter, prev.currentWord) ? Compare(letter.letter, prev.currentWord) : letter.isFound,
            }
          : letter
      );

      const letterClicked = letters.find((letter) => letter.id === id);

      let currentWord = prev.currentWord.map((current) => (current.letter === letterClicked.letter && Compare(letterClicked.letter, prev.currentWord) === 1 ? { ...current, showLetter: true } : current));

      let finish = { ...prev.finish };
      if (Compare(letterClicked.letter, prev.currentWord) === 2) {
        finish.foundedState += 1;
      }

      if (currentWord.every((current) => current.showLetter)) {
        finish.foundedWord = true;
      }
      let languages = prev.languages.map((language) => (language.id === finish.foundedState ? { ...language, found: true } : language));

      if (finish.foundedState === 8) {
        currentWord = currentWord.map((current) => (current.showLetter ? current : { ...current, showLetter: true, color: "#ff0000" }));
      }
      return { letters, currentWord, finish, languages };
    });
  }

  function restartGame() {
    setGameState({
      finish: { foundedState: -1, foundedWord: false },
      languages: languages.map((lang) => ({ ...lang, found: false })),
      currentWord: GetNewWord(),
      letters: letters.map((letter) => ({ id: nanoid(), letter, isOn: false, isFound: 0 })),
    });
  }

  function guessWord(finish, languages) {
    if (finish.foundedState === 8) return <FinishGameText color="#ba2a2a" text="Game over!" message="You lose! Better start learning Assembly 😭" border="none" />;
    if (finish.foundedWord) return <FinishGameText color="#10a95b" text="You win!" message="Well done! 🎉" border="none" />;
    if (finish.foundedState > -1 && finish.foundedState < 8) return <FinishGameText color="#7a5ea7" text={getFarewellText(languages[finish.foundedState].name)} message="" border="2px dashed #323232" />;
    return <FinishGameText color="" text="" message="" border="" />;
  }

  return (
    <div className="game-body">
      {gameState.finish.foundedWord && gameState.finish.foundedState < 8 && <ReactConfetti recycle={false} numberOfPieces={2000} className="react-confetti" />}

      {guessWord(gameState.finish, gameState.languages)}

      <div className="list-languages">{listLanguages}</div>

      <div className="list-letters-word">{selectedWord}</div>

      <div className="list-letters">{listLetters}</div>

      {(gameState.finish.foundedState === 8 || gameState.finish.foundedWord) && (
        <button onClick={restartGame} className="new-game-button">
          New Game
        </button>
      )}
    </div>
  );
}
