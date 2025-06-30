import { Text, View } from "react-native";
import { useIntl } from "react-intl";

type UlcerStatusProps = {
  status:
    | "noUlcer"
    | "treatableWithin4Weeks"
    | "immediatelyTreatable"
    | "complexWounds";
};

export const UlcerStatus = ({ status }: UlcerStatusProps) => {
  const intl = useIntl();

  const getStatusLabel = () => {
    switch (status) {
      case "noUlcer":
        return intl.formatMessage({
          id: "NO_ULCER",
          defaultMessage: "No Ulcer",
        });
      case "treatableWithin4Weeks":
        return intl.formatMessage({
          id: "TREATABLE_WITHIN_4_WEEKS",
          defaultMessage: "Treatable Within 4 Weeks",
        });
      case "immediatelyTreatable":
        return intl.formatMessage({
          id: "IMMEDIATELY_TREATABLE",
          defaultMessage: "Immediately Treatable",
        });
      case "complexWounds":
        return intl.formatMessage({
          id: "COMPLEX_WOUNDS",
          defaultMessage: "Complex Wounds",
        });
    }
  };

  const statusStyling = {
    noUlcer: {
      container: "hsla(83, 89%, 89%, 1)",
      color: "hsla(84, 78%, 27%, 1)",
    },
    treatableWithin4Weeks: {
      container: "#F8F5E3",
      color: "hsla(53, 65%, 27%, 1)",
    },
    immediatelyTreatable: {
      container: "hsla(359, 54%, 91%, 1)",
      color: "hsla(359, 85%, 37%, 1)",
    },
    complexWounds: {
      container: "hsla(280, 54%, 91%, 1)",
      color: "hsla(280, 85%, 37%, 1)",
    },
  };

  return (
    <View
      className="py-1 pr-4 pl-3 flex-row gap-1.5 rounded-full items-center justify-start self-start"
      style={{ backgroundColor: statusStyling[status].container }}
    >
      <View
        className="size-3 rounded-full bg-primary-800"
        style={{ backgroundColor: statusStyling[status].color }}
      ></View>
      <Text
        className="text-[14px] leading-[18px] font-jakarta"
        style={{ color: statusStyling[status].color }}
      >
        {getStatusLabel()}
      </Text>
    </View>
  );
};
