import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "../../generalComponents";
import { deleteHistory } from "../../api/history";
import { showErrorToast, showSuccessToast } from "../../lib/toastUtils";
import { FormattedMessage } from "react-intl";

export const DeleteHistoryModal = ({ showModal, setShowModal, history }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteHistory,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showSuccessToast(
          <FormattedMessage id="HISTORY.DELETE_HISTORY_ITEM_SUCCESS" />
        );
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["history"] });
        return;
      }
    },
    onError: (error) => {
      console.error("Detection failed:", error);
      showErrorToast(
        <FormattedMessage id="HISTORY.DELETE_HISTORY_ITEM_ERROR" />
      );
    },
  });

  const handleDelete = () => {
    mutate(history._id);
  };
  return (
    <Modal
      isOpen={showModal}
      setIsOpen={setShowModal}
      title={<FormattedMessage id="HISTORY.DELETE_HISTORY_ITEM" />}
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            label={<FormattedMessage id="CANCEL" />}
            variant="tertiary"
            onClick={() => setShowModal(false)}
          />
          <Button
            label={<FormattedMessage id="DELETE" />}
            variant="destructive"
            onClick={handleDelete}
            isLoading={isPending}
          />
        </div>
      }
    >
      <div
        className="flex flex-col gap-4 mb-12"
        data-modalid="ulcer-detect-modal"
      >
        <div className="text-md text-secondary-text">
          <FormattedMessage id="HISTORY.DELETE_HISTORY_ITEM_DESCRIPTION" />
        </div>
      </div>
    </Modal>
  );
};
