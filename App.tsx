import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "./src/constants";
import { CartScreen, DetailsScreen } from "./src/screens";
import { BottomNavigator } from "./src/navigation";
import { StoreProvider } from "./src/context/Store";
import FlashMessage from "react-native-flash-message";
import StockTake from "./src/screens/StockTake";

const Stack = createStackNavigator();
const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="StockTake" component={StockTake} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </StoreProvider>
  );
};

export default App;
