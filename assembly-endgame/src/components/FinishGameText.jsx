export default function FinishGameText(props) {
  return (
    <div className="message finish-game-div" style={{ backgroundColor: `${props.color}`, border: `${props.border}` }}>
      <div className="finish-text">{props.text}</div>
      {props.message !== "" ? <div className="finish-message">{props.message}</div> : null}{" "}
    </div>
  );
}
