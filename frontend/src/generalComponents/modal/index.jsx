import { Modal } from "antd";
import { CancelIcon } from "../../assets/svgAssets";

export const CustomModal = ({
  isOpen,
  onCancel,
  setIsOpen,
  children,
  width = 530,
  footer,
  title = "",
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={() => (onCancel ? onCancel() : setIsOpen(false))}
      centered={true}
      closeIcon={false}
      className="custom-modal "
      width={width}
      title={
        <div className="flex justify-between items-center w-full gap-3 mb-4 text-primary-text">
          <div className="text-display-xs font-semibold font-display">
            {title ? title : null}
          </div>
          <button
            onClick={() => (onCancel ? onCancel() : setIsOpen(false))}
            className="text-primary-text size-8 flex items-center justify-center rounded-[16px] hover:bg-primary-100 dark:hover:bg-primary-900 transition-all cursor-pointer"
          >
            <CancelIcon />
          </button>
        </div>
      }
      footer={
        footer ? (
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
            {footer}
          </div>
        ) : null
      }
    >
      {children}
    </Modal>
  );
};
