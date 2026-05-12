import "./Loading.css"

export default function Loading({ variant = "gold", text = "Loading..." }) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className={`spinner ${variant}`}></div>
        <p>{text}</p>
      </div>
    </div>
  );
}