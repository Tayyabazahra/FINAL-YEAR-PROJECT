import { InfoIcon } from "../../assets/svgAssets";

export const Input = ({
  label = "Label",
  linkComponent = null,
  preIcon = null,
  postIcon = null,
  hintIcon = null,
  hint = "",
  error = "",
  placeholder = "",
  type = "text",
  registerProps = {},
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="text-primary-text text-sm">{label && label}</div>
        {linkComponent && linkComponent}
      </div>

      <div
        className={` flex items-center gap-2 py-3 px-4 rounded-lg border shadow-sm w-full hover:bg-neutral-50 dark:hover:bg-neutral-900   transition-all duration-200 ease-in-out focus-within:hover:bg-transparent dark:bg-none dark:shadow-none ${
          error
            ? "border-red-500"
            : "focus-within:border-neutral-950 focus-within:ring-neutral-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-50 focus-within:ring-2 border-neutral-300 dark:focus-within:ring-neutral-700 dark:focus-within:ring-offset-neutral-950 dark:focus-within:border-neutral-600 dark:border-neutral-600"
        }`}
      >
        {/* Pre icon  */}
        {preIcon && preIcon}
        <input
          placeholder={placeholder}
          className="placeholder:text-neutral-300 dark:placeholder:text-neutral-600  w-full outline-none text-primary-text text-base"
          type={type}
          {...registerProps}
        />
        {postIcon && postIcon}
      </div>

      <div>
        {hint && (
          <div className="flex items-center gap-2 text-neutral-600">
            {hintIcon || <InfoIcon width={16} height={16} />}
            <span className="text-xs ">{hint && hint}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500">
            {<InfoIcon width={16} height={16} />}
            <span className="text-xs ">{error && error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
