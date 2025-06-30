import { useState } from "react";
import { Button } from "../button";
import { AddMediaImageIcon, UploadIcon } from "../../assets/svgAssets";
import { FormattedMessage } from "react-intl";

export const ImageUploader = ({
  image,
  setImage,
  isSensitive,
  ref,
  isHistory = false,
}) => {
  const [showSensitiveImage, setShowSensitiveImage] = useState(false);

  // Handle image upload and convert to Base64
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result); // Updating parent state
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center pt-8 px-7 pb-14 bg-primary-50 dark:bg-neutral-950 rounded-[16px] mb-6 ${
        image && "h-[200px]"
      } ${
        !image &&
        "border border-dashed  border-primary-200 dark:border-primary-900"
      }`}
    >
      {image ? (
        // Sensitive Image Preview Layout
        <div className="absolute inset-0  w-full  rounded-xl ">
          <img
            src={image}
            alt="Uploaded"
            className={`w-full h-full rounded-[16px] object-cover transition-all `}
          />
          {!showSensitiveImage && (
            <div className="absolute inset-0  items-center justify-center bg-black/60 backdrop-blur-[16px] text-white rounded-[16px] flex flex-col gap-2 text-center">
              <p className="font-semibold text-sm">
                <FormattedMessage id="DETECTION.SENSITIVE_IMAGE" />
              </p>
              <p className="text-xs font-medium text-neutral-100 max-w-[250px]">
                <FormattedMessage id="DETECTION.SENSITIVE_IMAGE_DESCRIPTION" />
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-fullbg-[#f5fee7] rounded-xl">
          <span className="text-primary-700 dark:text-primary-300">
            <AddMediaImageIcon />
          </span>
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold text-text-primary">
              <FormattedMessage id="DETECTION.UPLOAD_IMAGE" />
            </p>
            <p className="text-xs font-medium text-text-secondary max-w-[250px]">
              <FormattedMessage id="DETECTION.UPLOAD_IMAGE_DESCRIPTION" />
            </p>
          </div>
        </div>
      )}
      {/* Upload / Show Image Button */}
      <label className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-full flex justify-center z-20">
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleImageUpload}
          ref={ref}
        />

        <div className="flex items-center gap-2 w-full justify-center">
          {image && !isHistory && (
            <Button
              type="button"
              onClick={() => ref.current.click()}
              label={<FormattedMessage id="DETECTION.CHANGE_IMAGE" />}
            />
          )}

          {image && isSensitive ? (
            <Button
              type="button"
              onClick={() => setShowSensitiveImage((prev) => !prev)}
              label={
                showSensitiveImage ? (
                  <FormattedMessage id="DETECTION.HIDE_IMAGE" />
                ) : (
                  <FormattedMessage id="DETECTION.SHOW_IMAGE" />
                )
              }
              variant="secondary"
            />
          ) : (
            <Button
              type="button"
              onClick={() => ref.current.click()}
              label={<FormattedMessage id="DETECTION.UPLOAD" />}
              variant="secondary"
              hasPreIcon
              preIcon={
                <span className="text-btn-secondary-text">
                  <UploadIcon />
                </span>
              }
            />
          )}
        </div>
      </label>
    </div>
  );
};
