import { useEffect, useRef, useState } from "react";
import { PageHeader } from "../../../layout/dashboardLayout/components";
import { Button } from "../../../generalComponents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectUlcer } from "../../../api/detection";
import { showErrorToast, showSuccessToast } from "../../../lib/toastUtils";
import illustrationEmpty from "../../../assets/illustration-empty.svg";
import illustrationEmptyDark from "../../../assets/illustration-empty-dark.svg";
import { FormattedMessage } from "react-intl";

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

export const badgeStyles = {
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

export const Detection = () => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const [result, setResult] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Detection | Radyab-e-Zakhm";
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDetectClick = () => {
    if (!image) {
      showErrorToast("Please upload an image first.");
      return;
    }

    const file = fileInputRef.current.files[0];
    if (!file) return;
    setResult({});
    mutate(file);
  };

  const selectedLanguage = localStorage.getItem("language");

  return (
    <main className="w-full h-dvh  bg-surface-2">
      <PageHeader title={<FormattedMessage id="DETECTION.TITLE" />} />

      <div
        className={`lg:flex-row p-6 flex gap-6 flex-col flex-1 lg:bg-neutral-50/75  lg:dark:bg-neutral-900 ${
          selectedLanguage === "ur" ? "rounded-tr-[40px]" : "rounded-tl-[40px]"
        } h-[calc(100vh-81px-80px)] lg:h-[calc(100vh-81px)] overflow-y-auto`}
      >
        <div className="pl-8 py-5 pr-4 border-r  border-neutral-200 dark:border-neutral-800 lg:flex flex-col gap-2 lg:w-[400px] h-full">
          <div className="text-primary-text flex flex-col gap-6">
            <p className="text-preset-3">
              <FormattedMessage id="DETECTION.UPLOAD_IMAGE_DESCRIPTION" />
            </p>

            <div className="h-64 w-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden bg-muted">
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <FormattedMessage id="DETECTION.NO_IMAGE_UPLOADED" />
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex items-center gap-4">
              <Button
                label={<FormattedMessage id="DETECTION.UPLOAD_IMAGE" />}
                variant="tertiary"
                onClick={handleUploadClick}
              />
              <Button
                label={<FormattedMessage id="DETECTION.START_DETECTING" />}
                onClick={handleDetectClick}
                disabled={isPending}
                isLoading={isPending}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          {result?.title && result?.description ? (
            <div className="p-4 md:p-8 max-w-[528px] flex flex-col gap-6">
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center flex-col gap-4 text-center text-primary-text">
                <img
                  src={illustrationEmpty}
                  alt="Empty Illustration"
                  className="dark:hidden"
                />
                <img
                  src={illustrationEmptyDark}
                  alt="Empty Illustration"
                  className="hidden dark:block"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-preset-2">
                    <FormattedMessage id="DETECTION.RESULTS_WILL_BE_SHOWN_HERE" />
                  </h3>
                  <p className="text-preset-3 text-secondary-text">
                    <FormattedMessage id="DETECTION.START_DETECTING_TO_SEE_RESULTS" />
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
