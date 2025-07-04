import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      {/* Apply this layout to all screens inside (auth) */}
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
