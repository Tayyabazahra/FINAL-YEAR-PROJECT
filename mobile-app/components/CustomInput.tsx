import { View, Text, TextInput, Image } from "react-native";
import { Controller } from "react-hook-form";

interface CustomInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rules?: object;
  hasPreIcon?: boolean;
  hasPostIcon?: boolean;
  preIcon?: any;
  postIcon?: any;
  secureTextEntry?: boolean;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  rules,
  hasPreIcon,
  preIcon,
  hasPostIcon,
  postIcon,
  secureTextEntry,
}: CustomInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className="items-start bg-base-white dark:bg-base-black dark:border-neutral-800 w-full py-3 px-5 rounded-[16px] border border-neutral-200">
            <Text className="text-sm font-jakarta-medium text-text-secondary dark:text-neutral-200">
              {label}
            </Text>
            <View className="flex-row items-center gap-3 justify-between ">
              {hasPreIcon && preIcon}
              <TextInput
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="flex-1 text-sm text-text-primary dark:text-neutral-50 font-jakarta-semibold"
                secureTextEntry={secureTextEntry}
              />
              {hasPostIcon && postIcon}
            </View>
          </View>
          {error && (
            <Text className="text-red-500 text-sm font-jost-bold -mt-3">
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;
