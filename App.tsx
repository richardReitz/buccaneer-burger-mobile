import React from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { Routes } from './src/pages/routes';

export default function App() {
    return (
        <GluestackUIProvider mode="light">
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <SafeAreaView style={{ flex: 1 }}>
                        <Routes />
                    </SafeAreaView>
                </NavigationContainer>
            </SafeAreaProvider>
        </GluestackUIProvider>
    );
}