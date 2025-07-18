export function XIcon({ className }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 256 256"
      version="1.1"
    >
      <g
        stroke="rgb(228, 86, 81)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <line x1="64" y1="64" x2="192" y2="192" />
        <line x1="192" y1="64" x2="64" y2="192" />
      </g>
    </svg>
  );
}
