import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DashboardScreen } from "../Dashboard"


export const AuthRoutes = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    )
}