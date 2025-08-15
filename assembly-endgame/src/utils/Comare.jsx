export default function Compare(letter, word) {
  //   console.log("le", letter);
  //   console.log("wo", word);
  const found = word.find((char) => {
    //  console.log("wo", char.letter);
    return char.letter === letter;
  });
  return found ? 1 : 2;
}
