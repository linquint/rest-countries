import "./Icon.css";

export default function Icon(props) {
  var { size, name, color } = props;
  size = size ?? 24;
  name = name ?? "search";
  color = color ?? "var(--text)";
  return (
    <div id="icon" 
      style={`
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        -webkit-mask: url(assets/${name}.svg) round;
        mask: url(assets/${name}.svg) round;
      `}
      />
  );
}