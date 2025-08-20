export default function Compare(letter, word) {
  const found = word.find((char) => {
    return char.letter === letter;
  });
  return found ? 1 : 2;
}
