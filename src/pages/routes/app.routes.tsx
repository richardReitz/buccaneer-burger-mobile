import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignInScreen } from "../SignIn"


export const AppRoutes = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}