export default function FinishGameText(props) {
  return (
    <div className="finish-game-div">
      <div className="message" style={{ backgroundColor: `${props.color}`, border: `${props.border}` }}>
        <div className="finish-text">{props.text}</div>
        {props.message !== "" ? <div className="finish-message">{props.message}</div> : null}
      </div>
    </div>
  );
}
