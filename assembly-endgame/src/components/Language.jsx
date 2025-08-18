export default function Language(props) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = "15px 'Hanken Grotesk', sans-serif";
  const textWidth = ctx.measureText(props.name).width;
  // console.log("foundeddd", props.found);

  return (
    <div className="language-div">
      <button className="language-button" style={{ backgroundColor: `${props.backgroundColor}`, color: `${props.color}` }}>
        {props.name}
        {props.found ? (
          <div className="icon-head" style={{ width: `${textWidth}px` }}>
            💀
          </div>
        ) : null}
      </button>
    </div>
  );
}
