import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "../../generalComponents";
import { deleteAllHistory } from "../../api/history";
import { showErrorToast, showSuccessToast } from "../../lib/toastUtils";
import { FormattedMessage } from "react-intl";

export const DeleteAllHistoryModal = ({ showModal, setShowModal }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteAllHistory,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showSuccessToast(
          <FormattedMessage id="HISTORY.DELETE_ALL_HISTORY_SUCCESS" />
        );
        setShowModal(false);
        queryClient.invalidateQueries({ queryKey: ["history"] });
        return;
      }
    },
    onError: () => {
      showErrorToast(
        <FormattedMessage id="HISTORY.DELETE_ALL_HISTORY_ERROR" />
      );
    },
  });

  const handleDelete = () => {
    mutate();
  };
  return (
    <Modal
      isOpen={showModal}
      setIsOpen={setShowModal}
      title={<FormattedMessage id="HISTORY.DELETE_ENTIRE_HISTORY" />}
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
      <div className="flex flex-col gap-4 mb-12">
        <div className="text-md text-secondary-text">
          <FormattedMessage id="HISTORY.DELETE_ENTIRE_HISTORY_DESCRIPTION" />
        </div>
      </div>
    </Modal>
  );
};
