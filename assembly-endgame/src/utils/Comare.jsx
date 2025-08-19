export default function Compare(letter, word) {
  return word.some((char) => char.letter === letter);
}
