import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Add, Auth, Categories, Home } from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as LocalAuthentication from "expo-local-authentication";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  // const alertCom = (title, mess, btnText, btnFun) => {
  //   return Alert.alert(title, mess, [
  //     {
  //       text: btnText,
  //       onPress: btnFun,
  //     },
  //   ]);
  // };

  // const fallBackToDefaultAuth = () => {
  //   console.log("fall back to password auth");
  // };

  // const handleBioAuth = async () => {
  //   const isBioAvailable = LocalAuthentication.hasHardwareAsync();
  //   if (!isBioAvailable)
  //     return alertCom(
  //       "Please Enter your password",
  //       "Bio not supported",
  //       "ok",
  //       () => fallBackToDefaultAuth()
  //     );
  //   // let bio;
  //   // if (isBioAvailable)
  //   const savedBio = LocalAuthentication.isEnrolledAsync();
  //   const bio = await LocalAuthentication.supportedAuthenticationTypesAsync();
  //   console.log("saved", savedBio);
  //   console.log("bio", bio);
  //   // if (!savedBio)
  //   //   return alertCom("bio not found", "Please Enter your password", "ok", () =>
  //   //     fallBackToDefaultAuth()
  //   //   );

  //   const bioAuth = await LocalAuthentication.authenticateAsync({
  //     promptMessage: "login with bio",
  //     cancelLabel: "cancel",
  //     // disableDeviceFallback: true,
  //   });
  //   if (bioAuth.success) setIsAuthenticated(bioAuth.success);
  // };

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
      console.log(result);
    });
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        {isAuthenticated ? (
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Back"
              component={Home}
            />
            <Stack.Screen name="Categories" component={Categories} />
            <Stack.Screen name="Add Expenses" component={Add} />
          </Stack.Navigator>
        ) : (
          <Auth onAuthenticate={onAuthenticate} />
        )}
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
