import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SignInScreen } from "../SignIn"
import { SignUpnScreen } from "../SignUp"


export const AppRoutes = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpnScreen} />
        </Stack.Navigator>
    )
}