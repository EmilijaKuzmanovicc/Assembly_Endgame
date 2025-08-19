import { words } from "../data/words";
import GetRandomNumer from "./GetRandomNumber";
export default function GetNewWord() {
  return words[GetRandomNumer(words.length)].split("").map((char, index) => ({ id: index, letter: char.toUpperCase(), showLetter: false, color: "#f9f4da" }));
}
