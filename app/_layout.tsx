import { Stack } from "expo-router";
import { MyContextProvider } from "./Context";

export default function Layout() {
  return (
    <MyContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="EditProfilePhoto" options={{ headerShown: false }} />
        <Stack.Screen name="Credits" options={{ headerShown: false }} />
      </Stack>
    </MyContextProvider>
  );
}
