import { Button, Modal } from "../../generalComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMe } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export const DeleteAccountModal = ({ showModal, setShowModal }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteMeMutation, isPending } = useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setShowModal(false);
      navigate("/login");
    },
  });

  const handleDeleteAccount = () => {
    deleteMeMutation();
  };

  return (
    <Modal
      isOpen={showModal}
      setIsOpen={setShowModal}
      title={<FormattedMessage id="SETTINGS.DELETE_ACCOUNT" />}
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            label={<FormattedMessage id="CANCEL" />}
            variant="tertiary"
            onClick={() => setShowModal(false)}
          />
          <Button
            label={<FormattedMessage id="SETTINGS.DELETE_ACCOUNT_BUTTON" />}
            variant="destructive"
            onClick={handleDeleteAccount}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-4 mb-12">
        <div className="text-md text-secondary-text">
          <FormattedMessage id="SETTINGS.DELETE_ACCOUNT_CONFIRMATION" />
        </div>
      </div>
    </Modal>
  );
};
