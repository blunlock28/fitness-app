import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ObjectivesScreen from '../screens/Objectives';
import HomeScreen from '../screens/Home';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Objectives">
        <Stack.Screen name="Objectives" component={ObjectivesScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Añade más pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}