import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ThemeProvider } from "react-native-magnus";
import { Appbar, Provider as PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

import EditResumeFormScreen from "./src/screens/resume/EditResumeFormScreen";

import {
  AuthProvider,
  useAuthDispatch,
  useAuthState,
} from "src/contexts/AuthContext";
import LoginScreen from "src/screens/authentication/LoginScreen";
import RegistrationScreen from "src/screens/authentication/RegistrationScreen";
import { SnackbarProvider } from "src/contexts/SnackBarContext";
import { Constants } from "src/assets";
import { SagaProvider } from "use-saga-reducer";
import API from "src/API";

enableScreens();
const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let authToken;

      try {
        authToken = await SecureStore.getItemAsync(Constants.authTokenKey);
      } catch (e) {}

      console.log(authToken);

      authDispatch({ type: "SET_AUTH_TOKEN", authToken });
      API.setAuthHeaders(authToken);

      setIsLoading(false);
      await SplashScreen.hideAsync();
    };

    bootstrapAsync();
  }, []);

  const onLogoutClicked = async () => {
    await SecureStore.deleteItemAsync(Constants.authTokenKey);
    authDispatch({
      type: "SET_AUTH_TOKEN",
      authToken: undefined,
    });
  };

  if (isLoading) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <SagaProvider>
      <PaperProvider>
        <ThemeProvider>
          <SnackbarProvider>
            <NavigationContainer>
              <Stack.Navigator>
                {authState.authToken == null ? (
                  // No token found, user isn't signed in
                  <>
                    <Stack.Screen
                      name="LoginScreen"
                      component={LoginScreen}
                      options={{
                        title: "Login",
                      }}
                    />
                    <Stack.Screen
                      name="RegistrationScreen"
                      component={RegistrationScreen}
                      options={{
                        title: "Registration",
                      }}
                    />
                  </>
                ) : (
                  // User is signed in
                  <Stack.Screen
                    name="EditResumeFormScreen"
                    component={EditResumeFormScreen}
                    options={{
                      title: "My Resume",
                      headerLeft: ({ tintColor }) => (
                        <Appbar.Action
                          color={tintColor}
                          icon="logout"
                          onPress={onLogoutClicked}
                        />
                      ),
                    }}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </SnackbarProvider>
        </ThemeProvider>
      </PaperProvider>
    </SagaProvider>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
