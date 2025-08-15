export default function Language(props) {
  return (
    <div className="language-div">
      <button className="language-button" style={{ backgroundColor: `${props.backgroundColor}`, color: `${props.color}` }}>
        {props.name}
        <div className="icon-head"> 💀 </div>
      </button>
    </div>
  );
}
