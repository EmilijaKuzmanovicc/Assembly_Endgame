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
import { languages } from "../data/languages";
import FinishGameText from "./FinishGameText";
export default function GameBody() {
  const [foundedState, setFoundedState] = React.useState(-1);

  const [languagesState, setLanguagesState] = React.useState(languages.map((prev) => ({ ...prev, found: false })));

  const listLanguages = languagesState.map((languageObj) => {
    return <Language key={languageObj.id} color={languageObj.color} name={languageObj.name} backgroundColor={languageObj.backgroundColor} found={languageObj.found} />;
  });

  const [currentWord, setCurrentWord] = React.useState(
    words[GetRandomNumer(482)].split("").map((char, index) => ({
      id: index,
      letter: char.toUpperCase(),
      showLetter: false,
    }))
  );
  // let wordLengthLeft = currentWord.length;
  // console.log("word length", wordLengthLeft);

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
  const [foundedWord, setFoundedWord] = React.useState(false);

  React.useEffect(() => {
    setLanguagesState((prevState) =>
      prevState.map((e) => {
        return e.id === foundedState ? { ...e, found: true } : e;
      })
    );
    const numFound = currentWord.every((e) => e.showLetter === true);
    console.log(">>>>>>>", numFound);
    if (numFound) setFoundedWord(true);
  }, [foundedState, currentWord]);

  function SwitchButton(id) {
    setLettersState((prev) => {
      return prev.map((currLetter) => {
        return currLetter.id === id ? { ...currLetter, isOn: !currLetter.isOn, isFound: currLetter.isFound !== Compare(currLetter.letter, currentWord) ? Compare(currLetter.letter, currentWord) : currLetter.isFound } : currLetter;
      });
    });

    setCurrentWord((prev) => {
      console.log("word", currentWord);
      const letterToFound = lettersState.find((e) => e.id === id);
      const compareLetters = Compare(letterToFound.letter, prev);

      if (compareLetters === 1) {
        const numFound = currentWord.every((e) => e.showLetter === true);
        console.log(">>>>>>>", numFound);
        if (numFound) setFoundedWord(true);
        return prev.map((currLetterWord) => (currLetterWord.letter === letterToFound.letter ? { ...currLetterWord, showLetter: true } : currLetterWord));
      } else if (compareLetters === 2) {
        setFoundedState((prev) => prev + 1);
        return prev;
      } else {
        return prev;
      }
    });
  }
  // function left() {
  //   console.log(
  //     "funckijaaa",
  //     currentWord.every((e) => e.showLetter === true)
  //   );
  //   return currentWord.every((e) => e.showLetter === true);
  // }

  function guessWord(foundedState, foundedWord) {
    console.group("game");
    console.log("foundedState:", foundedState);
    console.log("foundedWord: ", foundedWord);
    // console.log('foundedState: ', foundedState);
    console.groupEnd();
    if (foundedState === -1) {
      return <FinishGameText color="" text="" message="" border="" />;
    }
    if (foundedState < 8 && foundedState > -1) {
      if (foundedWord) {
        return <FinishGameText color="#10a95b" text="You win!" message="Well done! 🎉" />;
      }
      return <FinishGameText color="#7a5ea7" text={getFarewellText(listLanguages[foundedState].props.name)} message="" border="2px dashed #323232" />;
    }
    if (foundedState === 8) {
      console.log("aaaaaaa");
      return <FinishGameText color="#ba2a2a" text="Game over!" message="You lose! Better start learning Assembly 😭" />;
    }
  }

  return (
    <div className="game-body">
      {/* {foundedState < 8 ? (
        foundedState >= 0 ? (
          <FinishGameText color="#7a5ea7" text={getFarewellText(listLanguages[foundedState].props.name)} message="" border="2px dashed #323232" />
        ) : (
          <FinishGameText color="" text="" message="" border="" />
        )
      ) : !foundedWord ? (
        <FinishGameText color="#ba2a2a" text="Game over!" message="You lose! Better start learning Assembly 😭" />
      ) : (
        <FinishGameText color="#10a95b" text="You win!" message="Well done! 🎉" />
      )} */}
      {guessWord(foundedState, foundedWord)}
      <div className="list-languages">{listLanguages}</div>
      <div className="list-letters-word">{listLetersWord}</div>
      <div className="list-letters">{listLetters}</div>
      <button className="new-game-button">New Game</button>
    </div>
  );
}
