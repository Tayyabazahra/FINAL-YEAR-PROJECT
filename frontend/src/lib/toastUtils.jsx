// toastUtils.ts
import { toast } from "sonner";

// Success Toast
export const showSuccessToast = (message) => {
  toast.custom((t) => (
    <div
      className="bg-green-500 text-neutral-0 rounded-lg  px-4 py-3 flex flex-col  font-geist"
      onClick={() => toast.dismiss(t)}
    >
      <span className="font-semibold text-preset-3">Success</span>
      <span className="text-sm text-preset-4 text-neutral-100">{message}</span>
    </div>
  ));
};

// Info Toast
export const showInfoToast = (message) => {
  toast.custom((t) => (
    <div
      className="bg-blue-500 text-neutral-0 rounded-lg  px-4 py-3 flex flex-col font-geist"
      onClick={() => toast.dismiss(t)}
    >
      <span className="font-semibold text-preset-3">Info</span>
      <span className="text-sm text-preset-4 text-neutral-100">{message}</span>
    </div>
  ));
};

// Error Toast
export const showErrorToast = (message) => {
  toast.custom((t) => (
    <div
      className=" bg-red-500 text-neutral-0 rounded-lg  px-4 py-3 flex flex-col  font-geist"
      onClick={() => toast.dismiss(t)}
    >
      <span className="font-semibold text-preset-3">Error</span>
      <span className="text-sm text-preset-4 text-neutral-100">{message}</span>
    </div>
  ));
};
