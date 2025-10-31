import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // this is for a better ux while loading because isSignedIn is false by default

  if (!isSignedIn) return <Redirect href={"/sign-in"} />; // redirect to sign-in if not signed in

  return <Stack screenOptions={{ headerShown: false }} />;
}