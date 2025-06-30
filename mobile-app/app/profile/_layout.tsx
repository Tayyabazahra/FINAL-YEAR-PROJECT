import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      {/* Apply this layout to all screens inside (auth) */}
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
