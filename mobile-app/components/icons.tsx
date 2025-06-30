import { Svg, Path } from "react-native-svg";
import { useTheme } from "@/context/ThemeContext";

export const SunIcon = () => {
  const { isDark } = useTheme();
  const strokeColor = isDark ? "#ffffff" : "#000000";

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    >
      <Path
        d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M12 1V3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 21V23" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M4.22 4.22L5.64 5.64"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.36 18.36L19.78 19.78"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1 12H3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12H23" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M4.22 19.78L5.64 18.36"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.36 5.64L19.78 4.22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const MoonIcon = () => {
  const { isDark } = useTheme();
  const strokeColor = isDark ? "#ffffff" : "#000000";

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={strokeColor}
      strokeWidth="2"
    >
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
