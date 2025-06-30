import { NoDataFoundIcon } from "../../assets/svgAssets";

export const EmptyContent = () => {
  return (
    <div className="flex flex-col gap-3 items-center py-12">
      <NoDataFoundIcon />
      <p className="text-sm font-medium text-neutral-600">Nothing found</p>
    </div>
  );
};
