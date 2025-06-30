export const Option = ({
  title,
  subtitle,
  icon,
  selected,
  setSelected,
  value,
}) => {
  return (
    <div
      onClick={() => setSelected(value)}
      className={`flex items-center justify-between p-4 cursor-pointer gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 ${
        selected ? "bg-neutral-100 dark:bg-neutral-800" : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="size-10 flex items-center text-primary-text justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-surface-2">
          {icon}
        </div>
        <div className="flex flex-col ">
          <p className="text-md font-medium text-primary-text">{title}</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {subtitle}
          </p>
        </div>
      </div>

      <div>
        <RadioButton selected={selected} />
      </div>
    </div>
  );
};

export const RadioButton = ({ selected }) => {
  return (
    <div
      className={`w-4 h-4 rounded-full bg-surface-2 ${
        selected
          ? "border-[4px] border-green-500 "
          : "border-4 border-neutral-200 dark:border-neutral-800"
      }`}
    ></div>
  );
};
