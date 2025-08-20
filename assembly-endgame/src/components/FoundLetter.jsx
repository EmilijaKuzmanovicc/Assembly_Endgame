export default function FoundLetter(props) {
  const value = props.showLetter ? props.letter : "\u00A0";
  return (
    <>
      <button className="found-letter-button" style={{ color: `${props.color}` }}>
        {value}
      </button>
    </>
  );
}
