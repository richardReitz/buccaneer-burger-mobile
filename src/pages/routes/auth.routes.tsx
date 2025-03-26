import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { DashboardScreen } from "../Dashboard"


export const AuhtRoutes = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
    )
}