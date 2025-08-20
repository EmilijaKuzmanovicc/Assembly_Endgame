export default function Letter(props) {
  const colorValue = props.isFound === 0 ? "#fcba29" : props.isFound === 1 ? "green" : "red";
  return (
    <button onClick={() => props.func(props.id)} className="letter-button" style={{ backgroundColor: `${colorValue}`, color: "black" }}>
      {props.letter}
    </button>
  );
}
