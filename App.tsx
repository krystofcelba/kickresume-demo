import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import EditResumeFormScreen from "./src/screens/EditResumeFormScreen";
import { ThemeProvider } from "react-native-magnus";

enableScreens();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="EditResumeFormScreen"
            component={EditResumeFormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
