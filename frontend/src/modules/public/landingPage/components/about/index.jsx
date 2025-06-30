import { FormattedMessage } from "react-intl";

export const About = () => {
  return (
    <section
      id="about"
      className="max-w-[980px] mx-auto px-4 lg:px-0 py-10 md:py-24 flex flex-col gap-16 lg:gap-20"
    >
      <div className="flex items-start gap-4 flex-col md:flex-row">
        <h2 className="flex-1 text-2xl md:text-3xl font-semibold text-primary-text">
          <FormattedMessage id="LANDING.ABOUT_US" />
        </h2>
        <p className="flex-1 text-secondary-text text-lg">
          <FormattedMessage id="LANDING.ABOUT_US_PARAGRAPH" />
        </p>
      </div>

      <div className="flex items-start gap-4 flex-col md:flex-row-reverse">
        <h2 className="flex-1 text-2xl md:text-3xl font-semibold text-primary-text">
          <FormattedMessage id="LANDING.OUR_VISION" />
        </h2>
        <p className="flex-1 text-secondary-text text-lg">
          <FormattedMessage id="LANDING.OUR_VISION_PARAGRAPH" />
        </p>
      </div>

      <div className="flex items-start gap-4 flex-col md:flex-row">
        <h2 className="flex-1 text-2xl md:text-3xl font-semibold text-primary-text">
          <FormattedMessage id="LANDING.OUR_MISSION" />
        </h2>
        <p className="flex-1 text-secondary-text text-lg">
          <FormattedMessage id="LANDING.OUR_MISSION_PARAGRAPH" />
        </p>
      </div>
    </section>
  );
};
