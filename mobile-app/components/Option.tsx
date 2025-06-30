import { View, Text, Pressable, I18nManager } from "react-native";

interface OptionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

export const Option = ({
  title,
  subtitle,
  icon,
  selected,
  onSelect,
}: OptionProps) => {
  const isRTL = I18nManager.isRTL;

  return (
    <Pressable
      onPress={onSelect}
      className={`flex-row items-center justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 ${
        selected ? "bg-neutral-100 dark:bg-neutral-800" : "bg-transparent"
      }`}
    >
      <View
        className={`flex-row items-center gap-4 ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        <View className="size-10 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-surface-2">
          {icon}
        </View>
        <View className="flex-col">
          <Text className="text-base font-medium text-primary-text dark:text-neutral-50">
            {title}
          </Text>
          <Text className="text-sm text-neutral-700 dark:text-neutral-300">
            {subtitle}
          </Text>
        </View>
      </View>

      <RadioButton selected={selected} />
    </Pressable>
  );
};

const RadioButton = ({ selected }: { selected: boolean }) => {
  return (
    <View
      className={`size-4 rounded-full bg-surface-2 ${
        selected
          ? "border-[4px] border-green-500"
          : "border-4 border-neutral-200 dark:border-neutral-800"
      }`}
    />
  );
};
