import { FormattedMessage } from "react-intl";
import {
  BilingualIcon,
  DetectLarge,
  FastIcon,
  FreeIcon,
  InterfaceIcon,
  TargetIcon,
} from "../../../../../assets/svgAssets";

const featuresData = [
  {
    id: 0,
    title: "FEATURE.F1_TITLE",
    description: "FEATURE.F1_DESCRIPTION",
    icon: <BilingualIcon />,
  },
  {
    id: 1,
    title: "FEATURE.F2_TITLE",
    description: "FEATURE.F2_DESCRIPTION",
    icon: <DetectLarge />,
  },
  {
    id: 2,
    title: "FEATURE.F3_TITLE",
    description: "FEATURE.F3_DESCRIPTION",
    icon: <InterfaceIcon />,
  },
  {
    id: 3,
    title: "FEATURE.F4_TITLE",
    description: "FEATURE.F4_DESCRIPTION",
    icon: <FreeIcon />,
  },
  {
    id: 4,
    title: "FEATURE.F5_TITLE",
    description: "FEATURE.F5_DESCRIPTION",
    icon: <FastIcon />,
  },
  {
    id: 5,
    title: "FEATURE.F6_TITLE",
    description: "FEATURE.F6_DESCRIPTION",
    icon: <TargetIcon />,
  },
];

export const Features = () => {
  return (
    <section
      id="features"
      className="max-w-[1110px] mx-auto px-4 lg:px-0 py-10 md:py-24 flex flex-col gap-16 lg:gap-20"
    >
      <div>
        <div className="px-6 py-2 bg-primary-50 dark:bg-primary-900 text-primary-900 dark:text-primary-50 rounded-full text-sm font-medium uppercase border border-primary-200 dark:border-primary-700 justify-self-center">
          <FormattedMessage id="LANDING.FEATURES" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.map((feature) => (
          <div key={feature.id} className="bg-surface-2 rounded-lg p-6">
            <span className="text-primary-500">{feature.icon}</span>
            <h3 className="text-lg font-medium mt-6 text-primary-text">
              <FormattedMessage id={feature.title} />
            </h3>
            <p className="text-sm text-secondary-text">
              <FormattedMessage id={feature.description} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
