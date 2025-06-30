import { useRef, useState } from "react";
import { Button, ImageUploader, Modal } from "../../generalComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectUlcer } from "../../api/detection";
import { showErrorToast, showSuccessToast } from "../../lib/toastUtils";
import { FormattedMessage } from "react-intl";
// import illustrationEmpty from "../../assets/illustration-empty.svg";
// import illustrationEmptyDark from "../../assets/illustration-empty-dark.svg";

const resultsObj = {
  "Complex wound": {
    title: <FormattedMessage id="HISTORY.COMPLEX_WOUND" />,
    description: <FormattedMessage id="HISTORY.COMPLEX_WOUND_DESCRIPTION" />,
  },
  "Immediately treatable": {
    title: <FormattedMessage id="HISTORY.IMMEDIATELY_TREATABLE" />,
    description: (
      <FormattedMessage id="HISTORY.IMMEDIATELY_TREATABLE_DESCRIPTION" />
    ),
  },
  "No Ulcer": {
    title: <FormattedMessage id="HISTORY.NO_ULCER" />,
    description: <FormattedMessage id="HISTORY.NO_ULCER_DESCRIPTION" />,
  },
  "Treatable within 4 weeks": {
    title: <FormattedMessage id="HISTORY.TREATABLE_WITHIN_4_WEEKS" />,
    description: (
      <FormattedMessage id="HISTORY.TREATABLE_WITHIN_4_WEEKS_DESCRIPTION" />
    ),
  },
};

const badgeStyles = {
  "Complex wound": {
    bg: "bg-red-100 dark:bg-red-200/10",
    text: "text-red-800 dark:text-red-400",
  },
  "Immediately treatable": {
    bg: "bg-orange-100 dark:bg-orange-200/10",
    text: "text-orange-800 dark:text-orange-400",
  },
  "No Ulcer": {
    bg: "bg-yellow-100 dark:bg-yellow-200/10",
    text: "text-yellow-800 dark:text-yellow-400",
  },
  "Treatable within 4 weeks": {
    bg: "bg-green-100 dark:bg-green-200/10",
    text: "text-green-800 dark:text-green-400",
  },
};

export const UlcerDetectModal = ({ showModal, setShowModal }) => {
  const [image, setImage] = useState("");
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: detectUlcer,
    onSuccess: (data) => {
      if (data.status !== "success") {
        showSuccessToast(data.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["history"] });

      setResult(resultsObj[data.data.result]);
    },
    onError: (error) => {
      console.error("Detection failed:", error);
      showErrorToast(error.message);
    },
  });

  const handleDetectClick = () => {
    if (!image) {
      showErrorToast("Please upload an image first.");
      return;
    }
    const file = fileInputRef.current.files[0];
    setResult(null);
    mutate(file);
  };

  return (
    <Modal
      isOpen={showModal}
      setIsOpen={setShowModal}
      title={<FormattedMessage id="DETECTION.START_DETECTION" />}
      footer={
        <div className="flex items-center justify-end gap-3">
          <Button
            label={<FormattedMessage id="DETECTION.CANCEL" />}
            variant="tertiary"
            onClick={() => setShowModal(false)}
          />
          <Button
            label={<FormattedMessage id="DETECTION.DETECT" />}
            onClick={handleDetectClick}
            disabled={isPending}
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
          <FormattedMessage id="DETECTION.UPLOAD_IMAGE_DESCRIPTION" />
        </div>
        <ImageUploader
          image={image}
          setImage={setImage}
          isSensitive={true}
          ref={fileInputRef}
        />

        <div className="flex-1">
          {result?.title && result?.description && (
            <div className="flex flex-col gap-6">
              <h2 className="text-preset-3 text-primary-text font-semibold">
                <FormattedMessage id="DETECTION.DETECTION_RESULT" />
              </h2>
              <div className="flex flex-col gap-4">
                <h3
                  className={`inline-block px-3 py-1 self-start rounded-full text-sm font-medium ${
                    badgeStyles[result?.title]?.bg || "bg-gray-100"
                  } ${badgeStyles[result?.title]?.text || "text-gray-800"}`}
                >
                  {result?.title}
                </h3>
                <p className="text-preset-4 text-secondary-text">
                  {result?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
