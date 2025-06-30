export const Button = ({
  label = "",
  hasPreIcon = false,
  preIcon,
  hasPostIcon = false,
  postIcon,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
  isLoading = false,
  onClick,
}) => {
  const variants = {
    primary:
      "py-3 px-8 rounded-[24px] bg-btn-primary-bg text-btn-primary-text flex items-center gap-[10px] hover:bg-btn-primary-hover active:bg-btn-primary-active transition-all text-sm font-semibold flex items-center justify-center",
    secondary:
      "py-3 px-8 rounded-[24px] bg-btn-secondary-bg text-btn-secondary-text flex items-center gap-[10px] hover:bg-btn-secondary-hover active:bg-btn-secondary-active transition-all text-sm font-semibold flex items-center justify-center",
    tertiary:
      "py-3 px-8 rounded-[24px] border border-btn-tertiary-border text-btn-tertiary-text flex items-center gap-[10px] hover:opacity-80  transition-all text-sm font-semibold h-12 flex items-center justify-center",
    destructive:
      "py-3 px-8 rounded-[24px] bg-red-500 text-white flex items-center gap-[10px] hover:bg-red-600 active:bg-red-700 transition-all text-sm font-semibold flex items-center justify-center",
  };

  const LoadingDots = () => (
    <div className="flex items-center gap-1">
      <div
        className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style={{
          animationDelay: "0ms",
          animation: "bounce 1s infinite, opacityShift 1.5s infinite",
          opacity: 0.4,
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style={{
          animationDelay: "150ms",
          animation: "bounce 1s infinite, opacityShift 1.5s infinite 0.5s",
          opacity: 0.6,
        }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style={{
          animationDelay: "300ms",
          animation: "bounce 1s infinite, opacityShift 1.5s infinite 1s",
          opacity: 0.8,
        }}
      />
      <style>
        {`
          @keyframes opacityShift {
            0%, 100% { opacity: 0.4; }
            33% { opacity: 0.8; }
            66% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );

  return (
    <button
      className={`${variants[variant]} ${className} relative ${
        isLoading && "h-[48px]"
      }`}
      type={type}
      disabled={disabled || isLoading}
      onClick={() => onClick && onClick()}
    >
      {!isLoading ? (
        <>
          {hasPreIcon && preIcon}
          {label}
          {hasPostIcon && postIcon}
        </>
      ) : (
        <LoadingDots />
      )}
    </button>
  );
};
