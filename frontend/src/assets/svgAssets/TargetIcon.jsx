export const TargetIcon = ({ width = 72, height = 72 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Z" />
        <path
          strokeLinecap="round"
          d="M2 12h3m14 0h3M12 22v-3m0-14V2"
          opacity="0.5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 12h-2m2 0h2m-2 0v2m0-2v-2"
        />
      </g>
    </svg>
  );
};
